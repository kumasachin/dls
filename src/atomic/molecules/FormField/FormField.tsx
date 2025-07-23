import React from 'react';
import { Text } from '../../atoms/Text/Text';

export interface FormFieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  hint?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  required = false,
  error,
  children,
  hint,
}) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label htmlFor={htmlFor}>
        <Text style={{ 
          display: 'block', 
          marginBottom: '6px',
          fontWeight: 500,
          color: error ? '#d32f2f' : 'inherit'
        }}>
          {label}
          {required && <span style={{ color: '#d32f2f', marginLeft: '2px' }}>*</span>}
        </Text>
      </label>
      
      {children}
      
      {(error || hint) && (
        <Text style={{ 
          fontSize: '12px', 
          marginTop: '4px', 
          color: error ? '#d32f2f' : '#757575'
        }}>
          {error || hint}
        </Text>
      )}
    </div>
  );
};

export default FormField;
