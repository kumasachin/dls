// Basic validation rules for form fields
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => string | undefined;
}

export const validateValue = async (
  value: unknown,
  rules: ValidationRule = {}
): Promise<string | undefined> => {
  // Check if field is required but empty
  if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
    return 'This field is required';
  }

  // Only validate string values for length and pattern
  if (value && typeof value === 'string') {
    if (rules.minLength && value.length < rules.minLength) {
      return `Must be at least ${rules.minLength} characters`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `Must be no more than ${rules.maxLength} characters`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return 'Invalid format';
    }
  }

  // Run custom validation if provided
  if (rules.custom) {
    return rules.custom(value);
  }

  return undefined;
};
