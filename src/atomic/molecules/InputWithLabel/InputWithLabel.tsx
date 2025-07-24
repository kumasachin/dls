import React from 'react';
import { Input } from '../../atoms/Input/Input';
import { Text } from '../../atoms/Text/Text';

export interface InputWithLabelProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
}

export const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  value,
  onChange,
  id,
  inputProps,
  labelProps,
}) => (
  <div>
    <Text as="label" htmlFor={id} {...labelProps}>
      {label}
    </Text>
    <Input id={id} value={value} onChange={onChange} {...inputProps} />
  </div>
);

export default InputWithLabel;
