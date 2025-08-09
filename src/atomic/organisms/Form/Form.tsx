import { cva, type VariantProps } from 'class-variance-authority';
import type { FormEvent } from 'react';
import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import styles from './Form.module.css';
import type { FieldError, FormErrors, FormValues } from './FormContext';
import { FormContext } from './FormContext';
import { useFormContext } from './useFormContext';
import type { ValidationRule } from './validation';
import { validateValue } from './validation';

// Form layout and spacing options
const formVariants = cva(styles.form, {
  variants: {
    layout: {
      vertical: styles.layoutVertical,
      horizontal: styles.layoutHorizontal,
      inline: styles.layoutInline,
    },
    spacing: {
      compact: styles.spacingCompact,
      default: styles.spacingDefault,
      relaxed: styles.spacingRelaxed,
    },
  },
  defaultVariants: {
    layout: 'vertical',
    spacing: 'default',
  },
});

export interface FormProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>,
    VariantProps<typeof formVariants> {
  children: React.ReactNode;
  title?: string;
  submitLabel?: string;
  cancelLabel?: string;
  actions?: React.ReactNode[];
  isSubmitting?: boolean;
  initialValues?: FormValues;
  onSubmit?: (
    event: FormEvent<HTMLFormElement>,
    values?: FormValues,
    helpers?: {
      setSubmitting: (submitting: boolean) => void;
      setErrors: (errors: FormErrors) => void;
    }
  ) => void | Promise<void>;
  onCancel?: () => void;
  validationSchema?: Record<string, ValidationRule>;
}

const FormComponent: React.FC<FormProps> = ({
  children,
  title,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  actions,
  isSubmitting: isSubmittingProp = false,
  initialValues = {},
  onSubmit,
  onCancel,
  validationSchema = {},
  layout,
  spacing,
  className,
  ...props
}) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouchedState] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(isSubmittingProp);
  const [fieldRules, setFieldRules] = useState<Record<string, ValidationRule>>({});
  const initialValuesRef = useRef(initialValues);

  // Sync external isSubmitting prop with internal state
  useEffect(() => {
    setIsSubmitting(isSubmittingProp);
  }, [isSubmittingProp]);

  const setValue = useCallback(
    (name: string, value: unknown) => {
      setValues((prev) => ({ ...prev, [name]: value }));

      // Clear any existing error when user starts typing
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const setError = useCallback((name: string, error: FieldError) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  const clearError = useCallback((name: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }, []);

  const setTouched = useCallback((name: string, isTouched = true) => {
    setTouchedState((prev) => ({ ...prev, [name]: isTouched }));
  }, []);

  const validateField = useCallback(
    async (name: string, value: unknown): Promise<FieldError> => {
      const rules = { ...validationSchema[name], ...fieldRules[name] };
      const error = await validateValue(value, rules);

      if (error) {
        setError(name, error);
      } else {
        clearError(name);
      }

      return error;
    },
    [validationSchema, fieldRules, setError, clearError]
  );

  const registerField = useCallback((name: string, rules?: ValidationRule) => {
    if (rules) {
      setFieldRules((prev) => ({ ...prev, [name]: rules }));
    }

    // Set up initial value if field is new
    setValues((prev) => {
      if (!(name in prev)) {
        return { ...prev, [name]: initialValuesRef.current[name] || '' };
      }
      return prev;
    });
  }, []);

  const unregisterField = useCallback(
    (name: string) => {
      setFieldRules((prev) => {
        const newRules = { ...prev };
        delete newRules[name];
        return newRules;
      });

      // Clean up field state when component unmounts
      setValues((prev) => {
        const newValues = { ...prev };
        delete newValues[name];
        return newValues;
      });

      clearError(name);

      setTouchedState((prev) => {
        const newTouched = { ...prev };
        delete newTouched[name];
        return newTouched;
      });
    },
    [clearError]
  );

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!onSubmit) return;

    setIsSubmitting(true);

    // Touch all fields so errors will show
    const touchedFields: Record<string, boolean> = {};
    Object.keys(values).forEach((name) => {
      touchedFields[name] = true;
    });
    setTouchedState(touchedFields);

    // Run validation on all fields
    const allErrors: FormErrors = {};
    for (const [name, value] of Object.entries(values)) {
      const error = await validateField(name, value);
      if (error) {
        allErrors[name] = error;
      }
    }

    // Only submit if no validation errors
    if (Object.keys(allErrors).length === 0) {
      try {
        await onSubmit(e, values, {
          setSubmitting: setIsSubmitting,
          setErrors,
        });
      } catch (submitError) {
        // Handle any submission errors
        if (submitError instanceof Error) {
          setErrors({ submit: submitError.message });
        }
      }
    }

    setIsSubmitting(false);
  };

  const formClasses = formVariants({ layout, spacing });

  return (
    <FormContext.Provider
      value={{
        values,
        errors,
        touched,
        isSubmitting,
        isValid,
        initialValues: initialValuesRef.current,
        setValue,
        setError,
        clearError,
        setTouched,
        validateField,
        registerField,
        unregisterField,
      }}
    >
      <form className={`${formClasses} ${className || ''}`} onSubmit={handleSubmit} {...props}>
        {title && (
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>{title}</h2>
          </div>
        )}
        <div className={styles.formBody}>{children}</div>
        <div className={styles.formActions}>
          {actions ? (
            actions.map((action, index) => (
              <div key={`action-${Date.now()}-${index}`} className={styles.formAction}>
                {action}
              </div>
            ))
          ) : (
            <>
              <FormSubmit disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : submitLabel}
              </FormSubmit>
              {onCancel && (
                <FormReset type="button" onClick={onCancel}>
                  {cancelLabel}
                </FormReset>
              )}
            </>
          )}
        </div>
      </form>
    </FormContext.Provider>
  );
};

// Individual form field component
interface FormFieldProps {
  name: string;
  children:
    | React.ReactElement
    | ((field: {
        id: string;
        value: unknown;
        onChange: (value: unknown) => void;
        onBlur: () => void;
        error?: string;
        touched: boolean;
        'aria-invalid'?: boolean;
        'aria-describedby'?: string;
      }) => React.ReactElement);
  rules?: ValidationRule;
  label?: string;
  hint?: string;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ name, children, rules, label, hint, required }) => {
  const {
    values,
    errors,
    touched,
    setValue,
    setTouched,
    validateField,
    registerField,
    unregisterField,
  } = useFormContext();

  const fieldId = useId();
  const value = values[name] || '';
  const error = errors[name];
  const isTouched = touched[name] || false;
  const showError = error && isTouched;

  // Set up field when component mounts
  React.useEffect(() => {
    const fieldRules: ValidationRule = {};
    if (rules) {
      Object.assign(fieldRules, rules);
    }
    if (required !== undefined) {
      fieldRules.required = required;
    }
    registerField(name, fieldRules);

    return () => {
      unregisterField(name);
    };
  }, [name, rules, required, registerField, unregisterField]);

  const handleChange = (newValue: unknown) => {
    setValue(name, newValue);
  };

  const handleBlur = async () => {
    setTouched(name, true);
    await validateField(name, value);
  };

  const fieldProps: {
    id: string;
    value: unknown;
    onChange: (value: unknown) => void;
    onBlur: () => void;
    error?: string;
    touched: boolean;
    'aria-invalid'?: boolean;
    'aria-describedby'?: string;
  } = {
    id: fieldId,
    value,
    onChange: handleChange,
    onBlur: handleBlur,
    touched: isTouched,
  };

  // Always include error if it exists
  if (error) {
    fieldProps.error = error;
  }

  if (showError && error) {
    fieldProps['aria-invalid'] = true;
    fieldProps['aria-describedby'] = `${fieldId}-error`;
  } else if (hint) {
    fieldProps['aria-describedby'] = `${fieldId}-hint`;
  }

  const enhancedChildren =
    typeof children === 'function'
      ? children(fieldProps)
      : React.cloneElement(
          children as React.ReactElement<Record<string, unknown>>,
          {
            id: fieldId,
            value,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(e.target.value);
              // Keep existing onChange behavior if present
              const originalProps = children.props as {
                onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
              };
              originalProps.onChange?.(e);
            },
            onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
              void handleBlur();
              // Keep existing onBlur behavior if present
              const originalProps = children.props as {
                onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
              };
              originalProps.onBlur?.(e);
            },
            'aria-invalid': showError,
            'aria-describedby': showError
              ? `${fieldId}-error`
              : hint
                ? `${fieldId}-hint`
                : undefined,
          } as Record<string, unknown>
        );

  // Show built-in error if using basic JSX or render prop doesn't handle errors
  const shouldShowBuiltInError =
    showError &&
    (typeof children !== 'function' || // JSX child - always show error
      (typeof children === 'function' && children.length < 3)); // Show if render function doesn't take error param (less than 3 params: id, value, onChange)

  return (
    <div className={styles.field}>
      {label && (
        <label
          htmlFor={fieldId}
          className={`${styles.fieldLabel} ${required ? styles.fieldRequired : ''}`}
        >
          {label}
          {required && <span title="required">*</span>}
        </label>
      )}

      {enhancedChildren}

      {hint && !showError && (
        <div id={`${fieldId}-hint`} className={styles.fieldHint}>
          {hint}
        </div>
      )}

      {shouldShowBuiltInError && (
        <div id={`${fieldId}-error`} className={styles.fieldError} role="alert" aria-live="polite">
          {error}
        </div>
      )}
    </div>
  );
};

// Submit button for forms
interface FormSubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loadingText?: string;
  disableOnInvalid?: boolean;
}

const FormSubmit: React.FC<FormSubmitProps> = ({
  children,
  loadingText = 'Submitting...',
  disableOnInvalid = false,
  disabled,
  className,
  ...props
}) => {
  const { isSubmitting, isValid } = useFormContext();

  const isDisabled = disabled || isSubmitting || (disableOnInvalid && !isValid);

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={`${styles.submitButton} ${className || ''}`}
      {...props}
    >
      {isSubmitting ? loadingText : children}
    </button>
  );
};

// Reset button for forms
interface FormResetProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  resetValues?: FormValues;
}

const FormReset: React.FC<FormResetProps> = ({ children, resetValues, className, ...props }) => {
  const { setValue, clearError, setTouched, values, initialValues } = useFormContext();

  const handleReset = () => {
    // Reset all form fields to initial state
    Object.keys(values).forEach((name) => {
      // Use custom reset values or fall back to initial values
      const resetValue = resetValues
        ? (resetValues[name] ?? initialValues[name] ?? '')
        : (initialValues[name] ?? '');
      setValue(name, resetValue);
      clearError(name);
      setTouched(name, false);
    });
  };

  return (
    <button
      type="button"
      onClick={handleReset}
      className={`${styles.resetButton} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Error message component for manual error display
interface FormErrorMessageProps {
  name: string;
  className?: string;
}

const FormErrorMessage: React.FC<FormErrorMessageProps> = ({ name, className }) => {
  const { errors, touched } = useFormContext();
  const error = errors[name];
  const isTouched = touched[name];

  if (!error || !isTouched) {
    return null;
  }

  return (
    <div className={`${styles.errorMessage} ${className || ''}`} role="alert" aria-live="polite">
      {error}
    </div>
  );
};

// Put it all together as a compound component
export const Form = FormComponent as React.FC<FormProps> & {
  Field: React.FC<FormFieldProps>;
  Submit: React.FC<FormSubmitProps>;
  Reset: React.FC<FormResetProps>;
  ErrorMessage: React.FC<FormErrorMessageProps>;
};

Form.Field = FormField;
Form.Submit = FormSubmit;
Form.Reset = FormReset;
Form.ErrorMessage = FormErrorMessage;

export default Form;
