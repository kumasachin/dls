import { clsx } from 'clsx';
import React from 'react';

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

export const Box = React.forwardRef<HTMLElement, BoxProps>(
  ({ as: Element = 'div', className, ...props }, ref) => {
    return <Element ref={ref} className={clsx(className)} {...props} />;
  }
);

Box.displayName = 'Box';
