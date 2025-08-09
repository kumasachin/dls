import { cva, type VariantProps } from 'class-variance-authority';
import type React from 'react';
import styles from './Input.module.css';

const inputVariants = cva(styles.input, {
  variants: {
    size: {
      sm: styles.sizeSmall,
      md: styles.sizeMedium,
      lg: styles.sizeLarge,
    },
    variant: {
      default: styles.variantDefault,
      error: styles.variantError,
      ghost: styles.variantGhost,
    },
    state: {
      default: '',
      disabled: styles.stateDisabled,
      readonly: styles.stateReadonly,
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
    state: 'default',
  },
});

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'size'>,
    VariantProps<typeof inputVariants> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  size,
  variant,
  state,
  error,
  disabled,
  readOnly,
  className,
  ...props
}) => {
  // Determine variant based on props
  const computedVariant = error ? 'error' : variant;
  const computedState = disabled ? 'disabled' : readOnly ? 'readonly' : state;

  const inputClasses = inputVariants({
    size,
    variant: computedVariant,
    state: computedState,
  });

  return (
    <input
      value={value}
      onChange={onChange}
      disabled={disabled}
      readOnly={readOnly}
      className={`${inputClasses} ${className || ''}`}
      {...props}
    />
  );
};

export default Input;
