import { cva, type VariantProps } from 'class-variance-authority';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import styles from './Dropdown.module.css';

// Dropdown Context for compound component communication
interface DropdownContextType {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onOpen: () => void;
  triggerId: string;
  contentId: string;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  itemsCount: number;
  setItemsCount: (count: number) => void;
}

const DropdownContext = createContext<DropdownContextType | null>(null);

const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown compound components must be used within a Dropdown');
  }
  return context;
};

// Main Dropdown Root Component
export interface DropdownProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Dropdown: React.FC<DropdownProps> & {
  Trigger: React.FC<DropdownTriggerProps>;
  Content: React.FC<DropdownContentProps>;
  Item: React.FC<DropdownItemProps>;
  Separator: React.FC<DropdownSeparatorProps>;
} = ({ children, defaultOpen = false, onOpenChange }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [itemsCount, setItemsCount] = useState(0);
  const triggerId = useId();
  const contentId = useId();

  const onToggle = useCallback(() => {
    const newOpen = !isOpen;
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
    if (!newOpen) {
      setActiveIndex(-1);
    }
  }, [isOpen, onOpenChange]);

  const onClose = useCallback(() => {
    setIsOpen(false);
    setActiveIndex(-1);
    onOpenChange?.(false);
  }, [onOpenChange]);

  const onOpen = useCallback(() => {
    setIsOpen(true);
    onOpenChange?.(true);
  }, [onOpenChange]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(`[data-dropdown-root]`)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        onToggle,
        onClose,
        onOpen,
        triggerId,
        contentId,
        activeIndex,
        setActiveIndex,
        itemsCount,
        setItemsCount,
      }}
    >
      <div className={styles.dropdown} data-dropdown-root>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

// Dropdown Trigger Component
const dropdownTriggerVariants = cva(styles.trigger, {
  variants: {
    variant: {
      default: styles.triggerDefault,
      outline: styles.triggerOutline,
      ghost: styles.triggerGhost,
    },
    size: {
      sm: styles.triggerSmall,
      md: styles.triggerMedium,
      lg: styles.triggerLarge,
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

interface DropdownTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof dropdownTriggerVariants> {
  children: React.ReactNode;
  asChild?: boolean;
}

const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  children,
  variant,
  size,
  className,
  asChild = false,
  ...props
}) => {
  const { isOpen, onToggle, triggerId, contentId } = useDropdownContext();

  const triggerClasses = dropdownTriggerVariants({ variant, size });

  if (asChild && React.isValidElement(children)) {
    const existingProps = children.props as Record<string, unknown>;
    const enhancedProps = {
      ...existingProps,
      'aria-haspopup': 'true',
      'aria-expanded': isOpen,
      'aria-controls': contentId,
      onClick: onToggle,
      className: `${triggerClasses} ${className || ''}`,
    };
    return React.cloneElement(children, enhancedProps);
  }

  return (
    <button
      id={triggerId}
      aria-haspopup="true"
      aria-expanded={isOpen}
      aria-controls={contentId}
      onClick={onToggle}
      className={`${triggerClasses} ${className || ''}`}
      {...props}
    >
      {children}
      <span className={styles.triggerIcon} aria-hidden="true">
        ▼
      </span>
    </button>
  );
};

// Dropdown Content Component
const dropdownContentVariants = cva(styles.content, {
  variants: {
    align: {
      start: styles.contentAlignStart,
      center: styles.contentAlignCenter,
      end: styles.contentAlignEnd,
    },
    side: {
      top: styles.contentSideTop,
      bottom: styles.contentSideBottom,
      left: styles.contentSideLeft,
      right: styles.contentSideRight,
    },
  },
  defaultVariants: {
    align: 'start',
    side: 'bottom',
  },
});

interface DropdownContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownContentVariants> {
  children: React.ReactNode;
}

const DropdownContent: React.FC<DropdownContentProps> = ({
  children,
  align,
  side,
  className,
  ...props
}) => {
  const { isOpen, contentId, triggerId, activeIndex, setActiveIndex, itemsCount, setItemsCount } =
    useDropdownContext();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      const items = contentRef.current.querySelectorAll('[role="menuitem"]:not([disabled])');
      setItemsCount(items.length);
    }
  }, [isOpen, setItemsCount]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setActiveIndex((activeIndex + 1) % itemsCount);
          break;
        case 'ArrowUp':
          event.preventDefault();
          setActiveIndex(activeIndex <= 0 ? itemsCount - 1 : activeIndex - 1);
          break;
        case 'Home':
          event.preventDefault();
          setActiveIndex(0);
          break;
        case 'End':
          event.preventDefault();
          setActiveIndex(itemsCount - 1);
          break;
        case 'Enter':
        case ' ': {
          event.preventDefault();
          const activeItem = contentRef.current?.querySelector(
            `[role="menuitem"]:nth-child(${activeIndex + 1})`
          ) as HTMLElement;
          activeItem?.click();
          break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, itemsCount, setActiveIndex]);

  if (!isOpen) return null;

  const contentClasses = dropdownContentVariants({ align, side });

  return (
    <div
      ref={contentRef}
      id={contentId}
      role="menu"
      aria-labelledby={triggerId}
      className={`${contentClasses} ${className || ''}`}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type === DropdownItem) {
          const existingProps = child.props as Record<string, unknown>;
          const uniqueKey = `dropdown-item-${index}-${typeof existingProps.children === 'string' ? existingProps.children.slice(0, 10) : index}`;
          const enhancedProps = {
            ...existingProps,
            key: uniqueKey,
          };

          // Add data attributes for styling
          const element = React.cloneElement(child, enhancedProps);

          return (
            <div key={uniqueKey} data-index={index} data-active={activeIndex === index}>
              {element}
            </div>
          );
        }
        return child;
      })}
    </div>
  );
};

// Dropdown Item Component
interface DropdownItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  disabled?: boolean;
  onSelect?: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  disabled = false,
  onSelect,
  className,
  ...props
}) => {
  const { onClose } = useDropdownContext();

  const handleSelect = () => {
    if (disabled) return;
    onSelect?.();
    onClose();
  };

  return (
    <div
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      className={`${styles.item} ${disabled ? styles.itemDisabled : ''} ${className || ''}`}
      onClick={handleSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelect();
        }
      }}
      {...props}
    >
      {children}
    </div>
  );
};

// Dropdown Separator Component
type DropdownSeparatorProps = React.HTMLAttributes<HTMLDivElement>;

const DropdownSeparator: React.FC<DropdownSeparatorProps> = ({ className, ...props }) => (
  <hr className={`${styles.separator} ${className || ''}`} {...props} />
);

// Attach compound components
Dropdown.Trigger = DropdownTrigger;
Dropdown.Content = DropdownContent;
Dropdown.Item = DropdownItem;
Dropdown.Separator = DropdownSeparator;

export default Dropdown;
