import { cva, type VariantProps } from 'class-variance-authority';
import type React from 'react';
import styles from './Text.module.css';

const textVariants = cva(styles.text, {
  variants: {
    size: {
      xs: styles.sizeExtraSmall,
      sm: styles.sizeSmall,
      md: styles.sizeMedium,
      lg: styles.sizeLarge,
      xl: styles.sizeExtraLarge,
      '2xl': styles.size2ExtraLarge,
    },
    weight: {
      normal: styles.weightNormal,
      medium: styles.weightMedium,
      semibold: styles.weightSemibold,
      bold: styles.weightBold,
    },
    variant: {
      primary: styles.colorPrimary,
      secondary: styles.colorSecondary,
      muted: styles.colorMuted,
      accent: styles.colorAccent,
      error: styles.colorError,
      success: styles.colorSuccess,
      warning: styles.colorWarning,
    },
    align: {
      left: styles.alignLeft,
      center: styles.alignCenter,
      right: styles.alignRight,
      justify: styles.alignJustify,
    },
  },
  defaultVariants: {
    size: 'md',
    weight: 'normal',
    variant: 'primary',
    align: 'left',
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: keyof React.JSX.IntrinsicElements;
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  as = 'span',
  children,
  size,
  weight,
  variant,
  align,
  className,
  ...props
}) => {
  const Component = as as React.ElementType;
  const textClasses = textVariants({
    size,
    weight,
    variant,
    align,
  });

  return (
    <Component className={`${textClasses} ${className || ''}`} {...props}>
      {children}
    </Component>
  );
};

export default Text;
