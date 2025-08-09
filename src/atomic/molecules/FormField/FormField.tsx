import React, { useId } from 'react';
import { Text } from '../../atoms/Text/Text';

export interface FormFieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  hint?: string;
  disabled?: boolean;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  required = false,
  error,
  children,
  hint,
  disabled = false,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  className,
}) => {
  // Generate unique IDs for accessibility
  const fieldId = useId();
  const errorId = error ? `${fieldId}-error` : undefined;
  const hintId = hint ? `${fieldId}-hint` : undefined;

  // Build aria-describedby attribute
  const describedByIds = [ariaDescribedBy, errorId, hintId].filter(Boolean).join(' ');

  // Determine aria-invalid
  const isInvalid = ariaInvalid !== undefined ? ariaInvalid : !!error;

  // Clone children to add accessibility attributes
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const existingProps = child.props as Record<string, unknown>;

      const childProps: Record<string, unknown> = {
        id: htmlFor || existingProps.id || `${fieldId}-input`,
        'aria-describedby': describedByIds || undefined,
        'aria-invalid': isInvalid,
        'aria-required': required,
        disabled: disabled || existingProps.disabled,
      };

      // Type-safe way to check for ARIA properties
      const hasAriaLabel = typeof existingProps['aria-label'] !== 'undefined';
      const hasAriaLabelledBy = typeof existingProps['aria-labelledby'] !== 'undefined';

      // Only add aria-labelledby if no explicit aria-label exists
      if (!hasAriaLabel && !hasAriaLabelledBy) {
        childProps['aria-labelledby'] = `${fieldId}-label`;
      }

      return React.cloneElement(child, {
        ...existingProps,
        ...childProps,
      });
    }
    return child;
  });

  return (
    <div className={className} style={{ marginBottom: '16px' }}>
      <label htmlFor={htmlFor || `${fieldId}-input`} id={`${fieldId}-label`}>
        <Text
          style={{
            display: 'block',
            marginBottom: '6px',
            fontWeight: 500,
            color: error ? '#d32f2f' : disabled ? '#9e9e9e' : 'inherit',
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        >
          {label}
          {required && (
            <span style={{ color: '#d32f2f', marginLeft: '2px' }} aria-label="required" role="img">
              *
            </span>
          )}
        </Text>
      </label>

      {enhancedChildren}

      {/* Error Message with proper ARIA attributes */}
      {error && (
        <Text
          id={errorId}
          role="alert"
          aria-live="polite"
          style={{
            fontSize: '12px',
            marginTop: '4px',
            color: '#d32f2f',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <span role="img" aria-label="error">
            ⚠️
          </span>
          {error}
        </Text>
      )}

      {/* Hint Text with proper ARIA attributes */}
      {hint && !error && (
        <Text
          id={hintId}
          style={{
            fontSize: '12px',
            marginTop: '4px',
            color: disabled ? '#bdbdbd' : '#757575',
          }}
        >
          {hint}
        </Text>
      )}
    </div>
  );
};

export default FormField;
