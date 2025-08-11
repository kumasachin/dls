import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import React, { useCallback, useState } from 'react';
import { ListItem, type ListItemProps } from '../../molecules/ListItem/ListItem';
import './List.css';

const listStyles = cva(['list-base'], {
  variants: {
    variant: {
      default: 'list-default',
      divided: 'list-divided',
      bordered: 'list-bordered',
      cards: 'list-cards',
    },
    size: {
      sm: 'list-sm',
      md: 'list-md',
      lg: 'list-lg',
    },
    layout: {
      stack: 'list-stack',
      grid: 'list-grid',
    },
    spacing: {
      none: 'list-spacing-none',
      sm: 'list-spacing-sm',
      md: 'list-spacing-md',
      lg: 'list-spacing-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    layout: 'stack',
    spacing: 'md',
  },
});

export interface ListItemData extends Omit<ListItemProps, 'onItemClick' | 'selected'> {
  /** Unique identifier for the list item */
  id: string;
}

export interface ListProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>,
    VariantProps<typeof listStyles> {
  /** Array of list item data */
  items: ListItemData[];
  /** Whether items can be selected */
  selectable?: boolean;
  /** Whether multiple items can be selected */
  multiSelect?: boolean;
  /** Currently selected item IDs */
  selectedIds?: string[];
  /** Default selected item IDs for uncontrolled component */
  defaultSelectedIds?: string[];
  /** Callback when selection changes */
  onSelectionChange?: (selectedIds: string[]) => void;
  /** Callback when an item is clicked */
  onItemClick?: (item: ListItemData, index: number) => void;
  /** Whether the list is loading */
  loading?: boolean;
  /** Loading state component */
  loadingComponent?: React.ReactNode;
  /** Empty state component */
  emptyComponent?: React.ReactNode;
  /** Whether to show empty state when no items */
  showEmpty?: boolean;
  /** Custom grid columns for grid layout */
  gridColumns?: number;
  /** Whether to enable keyboard navigation */
  keyboardNavigation?: boolean;
  /** Custom render function for list items */
  renderItem?: (item: ListItemData, index: number, defaultProps: ListItemProps) => React.ReactNode;
}

export const List: React.FC<ListProps> = ({
  items,
  selectable = false,
  multiSelect = false,
  selectedIds: controlledSelectedIds,
  defaultSelectedIds = [],
  onSelectionChange,
  onItemClick,
  loading = false,
  loadingComponent,
  emptyComponent,
  showEmpty = true,
  gridColumns,
  keyboardNavigation = true,
  renderItem,
  variant,
  size,
  layout,
  spacing,
  className,
  style,
  ...props
}) => {
  const [uncontrolledSelectedIds, setUncontrolledSelectedIds] =
    useState<string[]>(defaultSelectedIds);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const isControlled = controlledSelectedIds !== undefined;
  const selectedIds = isControlled ? controlledSelectedIds : uncontrolledSelectedIds;

  const handleItemClick = useCallback(
    (item: ListItemData, index: number) => {
      // Handle selection if selectable
      if (selectable) {
        const isSelected = selectedIds.includes(item.id);
        let newSelectedIds: string[];

        if (multiSelect) {
          newSelectedIds = isSelected
            ? selectedIds.filter((id) => id !== item.id)
            : [...selectedIds, item.id];
        } else {
          newSelectedIds = isSelected ? [] : [item.id];
        }

        if (!isControlled) {
          setUncontrolledSelectedIds(newSelectedIds);
        }

        onSelectionChange?.(newSelectedIds);
      }

      // Call item click handler
      onItemClick?.(item, index);
    },
    [selectable, multiSelect, selectedIds, isControlled, onSelectionChange, onItemClick]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!keyboardNavigation || items.length === 0) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setFocusedIndex((prev) => (prev < items.length - 1 ? prev + 1 : prev));
          break;
        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case 'Home':
          event.preventDefault();
          setFocusedIndex(0);
          break;
        case 'End':
          event.preventDefault();
          setFocusedIndex(items.length - 1);
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < items.length) {
            const focusedItem = items[focusedIndex];
            if (focusedItem) {
              handleItemClick(focusedItem, focusedIndex);
            }
          }
          break;
      }
    },
    [keyboardNavigation, items, focusedIndex, handleItemClick]
  );

  const gridStyle =
    layout === 'grid' && gridColumns
      ? ({ '--list-grid-columns': gridColumns } as React.CSSProperties)
      : undefined;

  const combinedStyle = {
    ...style,
    ...gridStyle,
  };

  // Loading state
  if (loading) {
    return (
      <div
        className={clsx(listStyles({ variant, size, layout, spacing }), 'list-loading', className)}
      >
        {loadingComponent || (
          <div className="list-loading-content">
            <div className="list-spinner" />
            <span>Loading...</span>
          </div>
        )}
      </div>
    );
  }

  // Empty state
  if (items.length === 0 && showEmpty) {
    return (
      <div
        className={clsx(listStyles({ variant, size, layout, spacing }), 'list-empty', className)}
      >
        {emptyComponent || (
          <div className="list-empty-content">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="list-empty-icon"
            >
              <path
                d="M9 11H7V9H9V11ZM13 11H11V9H13V11ZM17 11H15V9H17V11ZM19 3H18V1H16V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19Z"
                fill="currentColor"
              />
            </svg>
            <span>No items to display</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={clsx(listStyles({ variant, size, layout, spacing }), className)}
      style={combinedStyle}
      onKeyDown={handleKeyDown}
      tabIndex={keyboardNavigation ? 0 : -1}
      role={selectable ? 'listbox' : 'list'}
      aria-multiselectable={selectable && multiSelect}
      {...props}
    >
      {items.map((item, index) => {
        const isSelected = selectedIds.includes(item.id);
        const isFocused = focusedIndex === index;

        const defaultProps: ListItemProps = {
          ...item,
          selected: isSelected,
          interactive: selectable || Boolean(onItemClick),
          onItemClick: () => handleItemClick(item, index),
          tabIndex: isFocused ? 0 : -1,
          'aria-selected': selectable ? isSelected : undefined,
        };

        if (renderItem) {
          return (
            <div key={item.id} className="list-item-wrapper" data-focused={isFocused}>
              {renderItem(item, index, defaultProps)}
            </div>
          );
        }

        return (
          <div key={item.id} className="list-item-wrapper" data-focused={isFocused}>
            <ListItem {...defaultProps} />
          </div>
        );
      })}
    </div>
  );
};

List.displayName = 'List';
