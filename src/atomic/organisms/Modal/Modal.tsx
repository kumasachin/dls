import React, { useEffect } from 'react';
import { Card } from '../../atoms/Card/Card';
import { IconButton } from '../../atoms/IconButton/IconButton';
import { Divider } from '../../atoms/Divider/Divider';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  width = '500px',
  closeOnBackdropClick = true,
  closeOnEscape = true,
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
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose, closeOnEscape]);

  if (!isOpen) return null;

  return (
    <div
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
    >
      <Card
        style={{
          maxWidth: width,
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
        }}
        shadow="lg"
      >
        {title && (
          <div>
            <div style={{ 
              padding: '16px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between' 
            }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 500 }}>{title}</h3>
              <IconButton 
                icon="✕" 
                onClick={onClose} 
                aria-label="Close modal"
              />
            </div>
            <Divider margin="0" />
          </div>
        )}

        <div 
          style={{ 
            padding: '16px',
            overflowY: 'auto',
            flex: '1 1 auto'
          }}
        >
          {children}
        </div>

        {footer && (
          <>
            <Divider margin="0" />
            <div style={{ 
              padding: '16px', 
              display: 'flex', 
              justifyContent: 'flex-end',
              gap: '12px'
            }}>
              {footer}
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default Modal;
