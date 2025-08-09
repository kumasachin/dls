import { useContext } from 'react';
import type { FormContextType } from './FormContext.ts';
import { FormContext } from './FormContext.ts';

export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('Form components must be used within a Form');
  }
  return context;
};
