import React from 'react';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof React.JSX.IntrinsicElements;
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({ as = 'span', children, ...props }) => {
  const Component = as as React.ElementType;
  return <Component {...props}>{children}</Component>;
};

export default Text;
