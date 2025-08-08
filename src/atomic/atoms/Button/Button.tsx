import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import React from 'react';
import { Box } from '../../primitives/Box';
import './Button.css';

const buttonStyles = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium transition-colors cursor-pointer',
    'border rounded-md',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white border-primary hover:bg-primary-hover focus-visible:ring-primary',
        secondary:
          'bg-white text-gray-900 border-gray-300 hover:bg-gray-50 focus-visible:ring-gray-500',
        ghost:
          'bg-transparent text-gray-700 border-transparent hover:bg-gray-100 focus-visible:ring-gray-500',
        danger: 'bg-red-600 text-white border-red-600 hover:bg-red-700 focus-visible:ring-red-500',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends VariantProps<typeof buttonStyles>,
    Omit<React.HTMLAttributes<HTMLElement>, 'as'> {
  loading?: boolean;
  disabled?: boolean;
  as?: React.ElementType;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      as = 'button',
      variant,
      size,
      loading,
      className,
      children,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const buttonProps = as === 'button' ? { disabled: disabled || loading, type } : {};

    return (
      <Box
        as={as}
        ref={ref}
        className={clsx(buttonStyles({ variant, size }), className)}
        aria-disabled={disabled || loading}
        {...buttonProps}
        {...props}
      >
        {loading && (
          <span className="animate-spin" aria-label="Loading">
            ⏳
          </span>
        )}
        {children}
      </Box>
    );
  }
);

Button.displayName = 'Button';
