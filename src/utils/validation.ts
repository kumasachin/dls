import { z } from 'zod';

// Theme validation schemas
export const ThemeSchema = z.enum(['light', 'dark', 'corporate', 'playful']);

export const ThemeContextSchema = z.object({
  theme: ThemeSchema,
  setTheme: z.function(),
  toggleDarkMode: z.function(),
  isDarkMode: z.boolean(),
});

// Component prop validation schemas
export const ButtonVariantSchema = z.enum(['primary', 'secondary', 'ghost', 'danger']);
export const ButtonSizeSchema = z.enum(['sm', 'md', 'lg']);

export const ButtonPropsSchema = z.object({
  variant: ButtonVariantSchema.optional(),
  size: ButtonSizeSchema.optional(),
  loading: z.boolean().optional(),
  disabled: z.boolean().optional(),
  as: z.string().optional(),
  type: z.enum(['button', 'submit', 'reset']).optional(),
  className: z.string().optional(),
  children: z.any().optional(),
});

export const InputVariantSchema = z.enum(['default', 'error', 'ghost']);
export const InputSizeSchema = z.enum(['sm', 'md', 'lg']);

export const InputPropsSchema = z.object({
  value: z.string(),
  onChange: z.function(),
  size: InputSizeSchema.optional(),
  variant: InputVariantSchema.optional(),
  error: z.boolean().optional(),
  disabled: z.boolean().optional(),
  readOnly: z.boolean().optional(),
  placeholder: z.string().optional(),
  className: z.string().optional(),
});

// Design token validation
export const ColorTokenSchema = z.object({
  primary: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  secondary: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  success: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  warning: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  danger: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
});

export const SpacingTokenSchema = z.record(
  z.string().regex(/^(xs|sm|md|lg|xl|2xl|3xl|4xl)$/, 'Must be a valid spacing key'),
  z.string().regex(/^\d+(\.\d+)?(px|rem|em)$/, 'Must be a valid CSS length')
);

export const TypographyTokenSchema = z.object({
  fontFamily: z.record(z.string(), z.string()),
  fontSize: z.record(
    z.string(),
    z.string().regex(/^\d+(\.\d+)?(px|rem|em)$/, 'Must be a valid font size')
  ),
  fontWeight: z.record(z.string(), z.number().min(100).max(900)),
  lineHeight: z.record(z.string(), z.number().positive()),
});

// Validation utilities
export const validateThemeProps = <T>(schema: z.ZodSchema<T>, props: unknown): T => {
  try {
    return schema.parse(props);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // eslint-disable-next-line no-console
      console.error('Theme validation error:', error.issues);
      throw new Error(
        `Invalid theme configuration: ${error.issues.map((e) => e.message).join(', ')}`
      );
    }
    throw error;
  }
};

export const validateComponentProps = <T>(
  schema: z.ZodSchema<T>,
  props: unknown,
  componentName: string
): T => {
  try {
    return schema.parse(props);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // eslint-disable-next-line no-console
      console.warn(`${componentName} prop validation warning:`, error.issues);
    }
    // In development, we warn but don't throw to avoid breaking the app
    return props as T;
  }
};

// Type inference helpers
export type Theme = z.infer<typeof ThemeSchema>;
export type ButtonVariant = z.infer<typeof ButtonVariantSchema>;
export type ButtonSize = z.infer<typeof ButtonSizeSchema>;
export type InputVariant = z.infer<typeof InputVariantSchema>;
export type InputSize = z.infer<typeof InputSizeSchema>;
