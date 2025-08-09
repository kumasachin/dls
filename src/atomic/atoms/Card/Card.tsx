import { cva, type VariantProps } from 'class-variance-authority';
import type React from 'react';
import styles from './Card.module.css';

const cardVariants = cva(styles.card, {
  variants: {
    elevation: {
      flat: styles.elevationFlat,
      raised: styles.elevationRaised,
      floating: styles.elevationFloating,
    },
    border: {
      none: '',
      subtle: styles.borderSubtle,
      strong: styles.borderStrong,
    },
    padding: {
      compact: styles.paddingCompact,
      default: styles.paddingDefault,
      spacious: styles.paddingSpacious,
    },
    radius: {
      none: styles.radiusNone,
      sm: styles.radiusSmall,
      md: styles.radiusMedium,
      lg: styles.radiusLarge,
    },
  },
  defaultVariants: {
    elevation: 'raised',
    border: 'none',
    padding: 'default',
    radius: 'md',
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  elevation,
  border,
  padding,
  radius,
  className,
  ...props
}) => {
  const cardClasses = cardVariants({
    elevation,
    border,
    padding,
    radius,
  });

  return (
    <div className={`${cardClasses} ${className || ''}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
