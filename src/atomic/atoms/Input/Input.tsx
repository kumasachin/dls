import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({ value, onChange, ...props }) => (
  <input value={value} onChange={onChange} {...props} />
);

export default Input;
