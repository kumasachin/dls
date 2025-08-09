import { createContext } from 'react';
import type { ValidationRule } from './validation';

export type FieldError = string | undefined;
export type FormErrors = Record<string, FieldError>;
export type FormValues = Record<string, unknown>;

// Context interface for sharing form state between components
export interface FormContextType {
  values: FormValues;
  errors: FormErrors;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
  initialValues: FormValues;
  setValue: (name: string, value: unknown) => void;
  setError: (name: string, error: FieldError) => void;
  clearError: (name: string) => void;
  setTouched: (name: string, touched?: boolean) => void;
  validateField: (name: string, value: unknown) => Promise<FieldError>;
  registerField: (name: string, rules?: ValidationRule) => void;
  unregisterField: (name: string) => void;
}

export const FormContext = createContext<FormContextType | null>(null);
