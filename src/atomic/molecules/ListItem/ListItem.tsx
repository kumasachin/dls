import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import React from 'react';
import { Image } from '../../atoms/Image/Image';
import { Tag } from '../../atoms/Tag/Tag';
import { Text } from '../../atoms/Text/Text';
import { Rating } from '../Rating/Rating';
import './ListItem.css';

const listItemStyles = cva(['list-item-base'], {
  variants: {
    variant: {
      default: 'list-item-default',
      card: 'list-item-card',
      compact: 'list-item-compact',
      detailed: 'list-item-detailed',
    },
    layout: {
      horizontal: 'list-item-horizontal',
      vertical: 'list-item-vertical',
    },
    size: {
      sm: 'list-item-sm',
      md: 'list-item-md',
      lg: 'list-item-lg',
    },
    interactive: {
      true: 'list-item-interactive',
      false: 'list-item-static',
    },
  },
  defaultVariants: {
    variant: 'default',
    layout: 'horizontal',
    size: 'md',
    interactive: false,
  },
});

export interface ListItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof listItemStyles> {
  /** Main image for the list item */
  image?: {
    src: string;
    alt: string;
    fallbackSrc?: string;
  };
  /** Title text */
  title: string;
  /** Description text */
  description?: string;
  /** Additional metadata text */
  metadata?: string;
  /** Array of tags */
  tags?: Array<{
    label: string;
    color?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
    size?: 'small' | 'medium' | 'large';
  }>;
  /** Rating configuration */
  rating?: {
    value: number;
    max?: 5 | 10 | 20;
    readOnly?: boolean;
    showValue?: boolean;
    onChange?: (value: number) => void;
  };
  /** Action buttons or elements */
  actions?: React.ReactNode;
  /** Whether the item is selected */
  selected?: boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Click handler for the entire item */
  onItemClick?: () => void;
  /** Custom content to replace or extend default layout */
  children?: React.ReactNode;
}

export const ListItem: React.FC<ListItemProps> = ({
  image,
  title,
  description,
  metadata,
  tags,
  rating,
  actions,
  selected = false,
  disabled = false,
  variant,
  layout,
  size,
  interactive,
  onItemClick,
  children,
  className,
  ...props
}) => {
  const isInteractive = interactive || Boolean(onItemClick);

  const handleClick = () => {
    if (!disabled && onItemClick) {
      onItemClick();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!disabled && onItemClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onItemClick();
    }
  };

  return (
    <div
      className={clsx(
        listItemStyles({ variant, layout, size, interactive: isInteractive }),
        selected && 'list-item-selected',
        disabled && 'list-item-disabled',
        className
      )}
      onClick={isInteractive ? handleClick : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      tabIndex={isInteractive && !disabled ? 0 : -1}
      role={isInteractive ? 'button' : undefined}
      aria-disabled={disabled}
      aria-selected={selected}
      {...props}
    >
      {children ? (
        children
      ) : (
        <>
          {/* Image Section */}
          {image && (
            <div className="list-item-image">
              <Image
                src={image.src}
                alt={image.alt}
                {...(image.fallbackSrc && { fallbackSrc: image.fallbackSrc })}
                size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}
                variant="rounded"
              />
            </div>
          )}

          {/* Content Section */}
          <div className="list-item-content">
            {/* Header with title and metadata */}
            <div className="list-item-header">
              <Text
                size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}
                weight="semibold"
                className="list-item-title"
                variant={disabled ? 'muted' : undefined}
              >
                {title}
              </Text>

              {metadata && (
                <Text size="sm" variant="muted" className="list-item-metadata">
                  {metadata}
                </Text>
              )}
            </div>

            {/* Description */}
            {description && (
              <Text
                size={size === 'sm' ? 'sm' : 'md'}
                variant={disabled ? 'muted' : 'secondary'}
                className="list-item-description"
              >
                {description}
              </Text>
            )}

            {/* Tags and Rating */}
            <div className="list-item-footer">
              {/* Tags */}
              {tags && tags.length > 0 && (
                <div className="list-item-tags">
                  {tags.map((tag, index) => (
                    <Tag
                      key={index}
                      label={tag.label}
                      color={tag.color || 'default'}
                      size={tag.size || (size === 'sm' ? 'small' : 'medium')}
                    />
                  ))}
                </div>
              )}

              {/* Rating */}
              {rating && (
                <div className="list-item-rating">
                  <Rating
                    value={rating.value}
                    max={rating.max || 5}
                    readOnly={rating.readOnly !== false}
                    {...(rating.showValue !== undefined && { showValue: rating.showValue })}
                    {...(rating.onChange && { onChange: rating.onChange })}
                    size={size === 'sm' ? 'sm' : 'md'}
                    disabled={disabled}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Actions Section */}
          {actions && <div className="list-item-actions">{actions}</div>}
        </>
      )}
    </div>
  );
};

ListItem.displayName = 'ListItem';
