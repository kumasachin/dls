import type React from 'react';
import { createContext, useContext, useEffect } from 'react';
import { Card } from '../../atoms/Card/Card';
import { Divider } from '../../atoms/Divider/Divider';
import { IconButton } from '../../atoms/IconButton/IconButton';

// Modal Context for compound component communication
interface ModalContextType {
  isOpen: boolean;
  onClose: () => void;
  closeOnBackdropClick: boolean;
  closeOnEscape: boolean;
}

const ModalContext = createContext<ModalContextType | null>(null);

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal compound components must be used within a Modal');
  }
  return context;
};

// Base Modal Props
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

// Compound Component Types
interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface ModalTitleProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

interface ModalCloseButtonProps {
  'aria-label'?: string;
  className?: string;
}

interface ModalBodyProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

// Main Modal Component
export const Modal: React.FC<ModalProps> & {
  Header: React.FC<ModalHeaderProps>;
  Title: React.FC<ModalTitleProps>;
  CloseButton: React.FC<ModalCloseButtonProps>;
  Body: React.FC<ModalBodyProps>;
  Footer: React.FC<ModalFooterProps>;
} = ({
  isOpen,
  onClose,
  children,
  width = '500px',
  closeOnBackdropClick = true,
  closeOnEscape = true,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
}) => {
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (closeOnEscape && isOpen && e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscapeKey);

      // Focus management for accessibility
      const modalElement = document.querySelector('[role="dialog"]') as HTMLElement;
      if (modalElement) {
        modalElement.focus();
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose, closeOnEscape]);

  if (!isOpen) return null;

  return (
    <ModalContext.Provider value={{ isOpen, onClose, closeOnBackdropClick, closeOnEscape }}>
      {/* biome-ignore lint/a11y/noStaticElementInteractions: Modal backdrop requires div with click handler for UX */}
      <div
        role="presentation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          zIndex: 1000,
        }}
        onClick={(e) => {
          if (closeOnBackdropClick && e.target === e.currentTarget) {
            onClose();
          }
        }}
        onKeyDown={(e) => {
          if (closeOnEscape && e.key === 'Escape') {
            onClose();
          }
        }}
      >
        <Card
          role="dialog"
          aria-modal="true"
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          tabIndex={-1}
          style={{
            maxWidth: width,
            width: '100%',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            padding: 0,
            outline: 'none',
          }}
          elevation="floating"
        >
          {children}
        </Card>
      </div>
    </ModalContext.Provider>
  );
};

// Modal.Header Component
const ModalHeader: React.FC<ModalHeaderProps> = ({ children, className }) => {
  return (
    <div>
      <div
        className={className}
        style={{
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {children}
      </div>
      <Divider margin="0" />
    </div>
  );
};

// Modal.Title Component
const ModalTitle: React.FC<ModalTitleProps> = ({ children, id, className }) => {
  return (
    <h3
      id={id}
      className={className}
      style={{
        margin: 0,
        fontSize: '18px',
        fontWeight: 500,
        flex: 1,
      }}
    >
      {children}
    </h3>
  );
};

// Modal.CloseButton Component
const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({
  'aria-label': ariaLabel = 'Close modal',
  className,
}) => {
  const { onClose } = useModalContext();

  return <IconButton icon="✕" onClick={onClose} aria-label={ariaLabel} className={className} />;
};

// Modal.Body Component
const ModalBody: React.FC<ModalBodyProps> = ({ children, id, className }) => {
  return (
    <div
      id={id}
      className={className}
      style={{
        padding: '16px',
        overflowY: 'auto',
        flex: '1 1 auto',
      }}
    >
      {children}
    </div>
  );
};

// Modal.Footer Component
const ModalFooter: React.FC<ModalFooterProps> = ({ children, className }) => {
  return (
    <>
      <Divider margin="0" />
      <div
        className={className}
        style={{
          padding: '16px',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
        }}
      >
        {children}
      </div>
    </>
  );
};

// Attach compound components
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.CloseButton = ModalCloseButton;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
