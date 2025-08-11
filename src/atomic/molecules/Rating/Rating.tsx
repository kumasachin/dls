import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import React, { useCallback, useState } from 'react';
import { Star } from '../../atoms/Star/Star';
import './Rating.css';

const ratingStyles = cva(['rating-base', 'inline-flex items-center gap-1'], {
  variants: {
    size: {
      sm: 'rating-sm',
      md: 'rating-md',
      lg: 'rating-lg',
      xl: 'rating-xl',
    },
    variant: {
      default: 'rating-default',
      primary: 'rating-primary',
      secondary: 'rating-secondary',
      warning: 'rating-warning',
      success: 'rating-success',
      danger: 'rating-danger',
    },
    precision: {
      full: 'rating-precision-full',
      half: 'rating-precision-half',
      quarter: 'rating-precision-quarter',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
    precision: 'full',
  },
});

export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof ratingStyles> {
  /** Current rating value */
  value?: number;
  /** Default rating value for uncontrolled component */
  defaultValue?: number;
  /** Maximum number of stars (5, 10, or 20) */
  max?: 5 | 10 | 20;
  /** Whether the rating is read-only */
  readOnly?: boolean;
  /** Whether the rating is disabled */
  disabled?: boolean;
  /** Whether to show half stars */
  allowHalf?: boolean;
  /** Whether to allow clearing the rating */
  allowClear?: boolean;
  /** Custom icon to use instead of star */
  icon?: React.ReactNode;
  /** Callback when rating changes */
  onChange?: (value: number) => void;
  /** Callback when rating is hovered */
  onHover?: (value: number) => void;
  /** Callback when hover ends */
  onHoverEnd?: () => void;
  /** Show tooltip with rating value */
  showTooltip?: boolean;
  /** Custom tooltip content */
  tooltipContent?: (value: number) => string;
  /** Labels for each rating value */
  labels?: string[];
  /** Whether to show the current value as text */
  showValue?: boolean;
  /** Format function for displayed value */
  formatValue?: (value: number, max: number) => string;
}

export const Rating: React.FC<RatingProps> = ({
  value: controlledValue,
  defaultValue = 0,
  max = 5,
  size,
  variant,
  precision,
  readOnly = false,
  disabled = false,
  allowHalf = false,
  allowClear = false,
  onChange,
  onHover,
  onHoverEnd,
  showTooltip = false,
  tooltipContent,
  labels,
  showValue = false,
  formatValue,
  className,
  ...props
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : uncontrolledValue;
  const displayValue = hoverValue !== null ? hoverValue : currentValue;

  const handleStarClick = useCallback(
    (starIndex: number, clickPosition?: 'left' | 'right', event?: React.MouseEvent) => {
      if (readOnly || disabled) return;

      let newValue = starIndex;

      // Handle half-star precision with position detection
      if (allowHalf && event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const width = rect.width;
        const isLeftSide = clickX < width * 0.3;

        if (isLeftSide) {
          newValue = starIndex - 0.5;
        }
      } else if (allowHalf && clickPosition === 'left') {
        newValue = starIndex - 0.5;
      }

      // Handle clearing
      if (allowClear && newValue === currentValue) {
        newValue = 0;
      }

      if (!isControlled) {
        setUncontrolledValue(newValue);
      }

      onChange?.(newValue);
    },
    [readOnly, disabled, allowHalf, allowClear, currentValue, isControlled, onChange]
  );

  const handleStarHover = useCallback(
    (starIndex: number, hoverPosition?: 'left' | 'right') => {
      if (readOnly || disabled) return;

      let hoverVal = starIndex;
      if (allowHalf && hoverPosition === 'left') {
        hoverVal = starIndex - 0.5;
      }

      setHoverValue(hoverVal);
      onHover?.(hoverVal);
    },
    [readOnly, disabled, allowHalf, onHover]
  );

  const handleMouseLeave = useCallback(() => {
    setHoverValue(null);
    onHoverEnd?.();
  }, [onHoverEnd]);

  const getStarFillAmount = (starIndex: number): number => {
    const value = displayValue;
    if (value >= starIndex) return 1;
    if (value >= starIndex - 0.5) return 0.5;
    return 0;
  };

  const handleStarInteraction = (starIndex: number, event: React.MouseEvent) => {
    if (readOnly || disabled) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    // More precise half-star detection - left 30% triggers half star
    const isLeftSide = clickX < width * 0.3;

    if (event.type === 'click') {
      handleStarClick(starIndex, allowHalf && isLeftSide ? 'left' : 'right');
    } else if (event.type === 'mouseover') {
      handleStarHover(starIndex, allowHalf && isLeftSide ? 'left' : 'right');
    }
  };

  const formatDisplayValue = (val: number): string => {
    if (formatValue) {
      return formatValue(val, max);
    }
    return `${val}/${max}`;
  };

  const getAriaValueText = (): string => {
    const labelIndex = Math.ceil(displayValue) - 1;
    if (labels && labels[labelIndex]) {
      return labels[labelIndex];
    }
    return `${displayValue} out of ${max} stars`;
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (readOnly || disabled) return;

    const currentFocus = document.activeElement as HTMLElement;
    const ratingContainer = currentFocus.closest('[role="radiogroup"]');
    const allStars = ratingContainer?.querySelectorAll(
      '[data-testid^="star-"]'
    ) as NodeListOf<HTMLElement>;

    if (!allStars || allStars.length === 0) return;

    const currentIndex = Array.from(allStars).indexOf(currentFocus);
    if (currentIndex === -1) return;

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        if (currentIndex < allStars.length - 1) {
          const nextStar = allStars[currentIndex + 1];
          if (nextStar) {
            nextStar.focus();
          }
        }
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (currentIndex > 0) {
          const prevStar = allStars[currentIndex - 1];
          if (prevStar) {
            prevStar.focus();
          }
        }
        break;
    }
  };

  return (
    <div
      className={clsx(ratingStyles({ size, variant, precision }), className)}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      role="radiogroup"
      aria-label="Rating"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={currentValue}
      aria-valuetext={getAriaValueText()}
      {...props}
    >
      <div className="rating-stars" role="presentation">
        {Array.from({ length: max }, (_, index) => {
          const starIndex = index + 1;
          const filled = getStarFillAmount(starIndex);

          return (
            <Star
              key={starIndex}
              size={size}
              variant={variant}
              filled={filled}
              value={starIndex}
              interactive={!readOnly && !disabled}
              disabled={disabled}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                handleStarClick(starIndex, undefined, e);
              }}
              onRate={() => handleStarClick(starIndex)} // For keyboard events
              onMouseOver={(e: React.MouseEvent) => handleStarInteraction(starIndex, e)}
              aria-label={`${starIndex} star${starIndex !== 1 ? 's' : ''}`}
              data-testid={`star-${starIndex}`}
            />
          );
        })}
      </div>

      {showValue && (
        <span className="rating-value" aria-live="polite">
          {formatDisplayValue(displayValue)}
        </span>
      )}

      {showTooltip && hoverValue !== null && (
        <div className="rating-tooltip" role="tooltip">
          {tooltipContent ? tooltipContent(hoverValue) : `${hoverValue}/${max}`}
        </div>
      )}
    </div>
  );
};

Rating.displayName = 'Rating';
