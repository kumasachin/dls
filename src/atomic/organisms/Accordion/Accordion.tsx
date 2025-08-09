import type { KeyboardEvent, ReactNode } from 'react';
import React, { createContext, useContext, useState } from 'react';
import { AccordionContext } from './AccordionContext';

// Main Accordion component props
export interface AccordionProps {
  children: ReactNode;
  defaultOpen?: string | string[];
  openItems?: string | string[];
  onToggle?: (itemIds: string[]) => void;
  allowMultiple?: boolean;
  variant?: 'default' | 'bordered' | 'filled';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

// AccordionItem component props
export interface AccordionItemProps {
  children: ReactNode;
  itemId: string;
  disabled?: boolean;
  className?: string;
}

// AccordionTrigger component props
export interface AccordionTriggerProps {
  children: ReactNode;
  className?: string;
}

// AccordionContent component props
export interface AccordionContentProps {
  children: ReactNode;
  className?: string;
}

// Context to pass itemId and disabled state to child components
interface AccordionItemContextType {
  itemId: string;
  disabled: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextType | null>(null);

const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error('AccordionTrigger and AccordionContent must be used within AccordionItem');
  }
  return context;
};

// Main Accordion Component
export const Accordion: React.FC<AccordionProps> & {
  Item: React.FC<AccordionItemProps>;
  Trigger: React.FC<AccordionTriggerProps>;
  Content: React.FC<AccordionContentProps>;
} = ({
  children,
  defaultOpen,
  openItems: controlledOpenItems,
  onToggle,
  allowMultiple = false,
  variant = 'default',
  size = 'medium',
  className,
}) => {
  // Normalize default open items to array
  const normalizeItems = (items: string | string[] | undefined): string[] => {
    if (!items) return [];
    return Array.isArray(items) ? items : [items];
  };

  const [internalOpenItems, setInternalOpenItems] = useState<string[]>(normalizeItems(defaultOpen));

  const isControlled = controlledOpenItems !== undefined;
  const openItems = isControlled ? normalizeItems(controlledOpenItems) : internalOpenItems;

  const handleToggle = (itemId: string) => {
    let newOpenItems: string[];

    if (allowMultiple) {
      // Multiple items can be open
      newOpenItems = openItems.includes(itemId)
        ? openItems.filter((id) => id !== itemId)
        : [...openItems, itemId];
    } else {
      // Only one item can be open
      newOpenItems = openItems.includes(itemId) ? [] : [itemId];
    }

    if (!isControlled) {
      setInternalOpenItems(newOpenItems);
    }
    onToggle?.(newOpenItems);
  };

  const getAccordionStyles = () => {
    const baseStyles = {
      border: variant === 'bordered' ? '1px solid #e0e0e0' : undefined,
      borderRadius: variant !== 'default' ? '8px' : undefined,
      backgroundColor: variant === 'filled' ? '#f8f9fa' : undefined,
      overflow: 'hidden',
    };
    return baseStyles;
  };

  return (
    <AccordionContext.Provider
      value={{ openItems, onToggle: handleToggle, allowMultiple, variant, size }}
    >
      <div className={className} style={getAccordionStyles()} data-accordion>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

// AccordionItem Component
const AccordionItem: React.FC<AccordionItemProps> = ({
  children,
  itemId,
  disabled = false,
  className,
}) => {
  const accordionContext = React.useContext(AccordionContext);
  if (!accordionContext) {
    throw new Error('AccordionItem must be used within an Accordion');
  }
  const { variant } = accordionContext;

  const getItemStyles = () => {
    const baseStyles = {
      borderBottom: variant === 'default' ? '1px solid #e0e0e0' : undefined,
      opacity: disabled ? 0.6 : 1,
    };
    return baseStyles;
  };

  return (
    <AccordionItemContext.Provider value={{ itemId, disabled }}>
      <div
        className={className}
        style={getItemStyles()}
        data-accordion-item={itemId}
        data-disabled={disabled}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

// AccordionTrigger Component
const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ children, className }) => {
  const accordionContext = React.useContext(AccordionContext);
  if (!accordionContext) {
    throw new Error('AccordionHeader must be used within an Accordion');
  }
  const { openItems, onToggle, size } = accordionContext;
  const { itemId, disabled } = useAccordionItemContext();

  const isOpen = openItems.includes(itemId);

  const handleClick = () => {
    if (!disabled && itemId) {
      onToggle(itemId);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;

    if (key === 'Enter' || key === ' ') {
      event.preventDefault();
      handleClick();
    } else if (key === 'ArrowDown' || key === 'ArrowUp') {
      event.preventDefault();

      // Find all accordion triggers
      const triggers = document.querySelectorAll(
        '[data-accordion-trigger]'
      ) as NodeListOf<HTMLElement>;

      if (!triggers?.length) return;

      const currentIndex = Array.from(triggers).findIndex((trigger) => trigger === event.target);
      if (currentIndex === -1) return;

      let nextIndex: number;
      if (key === 'ArrowDown') {
        nextIndex = (currentIndex + 1) % triggers.length;
      } else {
        nextIndex = currentIndex === 0 ? triggers.length - 1 : currentIndex - 1;
      }

      triggers[nextIndex]?.focus();
    }
  };

  const getSizeStyles = () => {
    const sizeMap = {
      small: { padding: '12px 16px', fontSize: '14px' },
      medium: { padding: '16px 20px', fontSize: '16px' },
      large: { padding: '20px 24px', fontSize: '18px' },
    };
    return sizeMap[size];
  };

  const getTriggerStyles = () => {
    const baseStyles = {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'transparent',
      border: 'none',
      textAlign: 'left' as const,
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontWeight: 500,
      color: '#1a1a1a',
      transition: 'background-color 0.2s ease',
      ...getSizeStyles(),
    };
    return baseStyles;
  };

  const getIconStyles = () => {
    return {
      fontSize: '12px',
      transition: 'transform 0.2s ease',
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      color: '#666',
    };
  };

  return (
    <div>
      <button
        type="button"
        className={className}
        style={getTriggerStyles()}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${itemId}`}
        id={`accordion-trigger-${itemId}`}
        data-accordion-trigger
        disabled={disabled}
      >
        <h3 style={{ flex: 1 }}>{children}</h3>
        <span style={getIconStyles()} aria-hidden="true">
          ▼
        </span>
      </button>
    </div>
  );
};

// AccordionContent Component
const AccordionContent: React.FC<AccordionContentProps> = ({ children, className }) => {
  const accordionContext = React.useContext(AccordionContext);
  if (!accordionContext) {
    throw new Error('AccordionContent must be used within an Accordion');
  }
  const { openItems, size } = accordionContext;
  const { itemId } = useAccordionItemContext();

  const isOpen = openItems.includes(itemId);

  const getSizeStyles = () => {
    const sizeMap = {
      small: { paddingLeft: '16px', paddingRight: '16px', paddingBottom: '12px' },
      medium: { paddingLeft: '20px', paddingRight: '20px', paddingBottom: '16px' },
      large: { paddingLeft: '24px', paddingRight: '24px', paddingBottom: '20px' },
    };
    return sizeMap[size];
  };

  const getContentStyles = () => {
    const baseStyles = {
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      maxHeight: isOpen ? '1000px' : '0',
      opacity: isOpen ? 1 : 0,
      backgroundColor: '#fff',
    };
    return baseStyles;
  };

  const getInnerStyles = () => {
    return getSizeStyles();
  };

  return (
    <div>
      <section
        style={getContentStyles()}
        id={`accordion-content-${itemId}`}
        aria-labelledby={`accordion-trigger-${itemId}`}
      >
        <div className={className} style={getInnerStyles()}>
          {children}
        </div>
      </section>
    </div>
  );
};

// Attach compound components
Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

export default Accordion;
