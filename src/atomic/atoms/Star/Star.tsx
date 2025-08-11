import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import React from 'react';
import './Star.css';

const starStyles = cva(['inline-block transition-all duration-200 cursor-pointer', 'star-base'], {
  variants: {
    size: {
      sm: 'star-sm',
      md: 'star-md',
      lg: 'star-lg',
      xl: 'star-xl',
    },
    variant: {
      default: 'star-default',
      primary: 'star-primary',
      secondary: 'star-secondary',
      warning: 'star-warning',
      success: 'star-success',
      danger: 'star-danger',
    },
    state: {
      empty: 'star-empty',
      half: 'star-half',
      full: 'star-full',
    },
    interactive: {
      true: 'star-interactive',
      false: 'star-static',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
    state: 'empty',
    interactive: true,
  },
});

export interface StarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof starStyles> {
  filled?: number; // 0 to 1 (for partial filling)
  value?: number; // The actual rating value this star represents
  onRate?: (value: number) => void;
  disabled?: boolean;
}

export const Star: React.FC<StarProps> = ({
  size,
  variant,
  state,
  interactive,
  filled = 0,
  value = 1,
  onRate,
  disabled = false,
  className,
  'aria-label': ariaLabel,
  ...props
}) => {
  // Determine state based on filled amount
  const starState = filled === 0 ? 'empty' : filled === 1 ? 'full' : 'half';

  // If interactive is not explicitly set, default based on whether onRate is provided
  const isInteractive = interactive !== undefined ? interactive : Boolean(onRate);

  const handleClick = () => {
    if (!disabled && isInteractive && onRate) {
      onRate(value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!disabled && isInteractive && onRate && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onRate(value);
    }
  };

  return (
    <span
      className={clsx(
        starStyles({
          size,
          variant,
          state: state || starState,
          interactive: isInteractive && !disabled,
        }),
        disabled && 'star-disabled',
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={isInteractive && !disabled ? 0 : -1}
      role={isInteractive && !disabled ? 'button' : 'img'}
      aria-label={ariaLabel || `${filled === 1 ? 'Full' : filled === 0 ? 'Empty' : 'Half'} star`}
      style={
        {
          '--star-fill-percentage': `${filled * 100}%`,
        } as React.CSSProperties
      }
      {...props}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="star-icon"
      >
        {/* Background star (empty state) */}
        <path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          className="star-background"
        />
        {/* Filled star (clipped by CSS) */}
        <path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          className="star-fill"
        />
      </svg>
    </span>
  );
};

Star.displayName = 'Star';
