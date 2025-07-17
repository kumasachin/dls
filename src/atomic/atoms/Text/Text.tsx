import React from 'react';

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({ as = 'span', children, ...props }) => {
  const Component = as;
  return <Component {...props}>{children}</Component>;
};

export default Text;
