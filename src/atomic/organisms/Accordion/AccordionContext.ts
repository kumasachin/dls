import { createContext, useContext } from 'react';

// Context for sharing accordion state between components
export interface AccordionContextType {
  openItems: string[];
  onToggle: (itemId: string) => void;
  allowMultiple: boolean;
  variant: 'default' | 'bordered' | 'filled';
  size: 'small' | 'medium' | 'large';
}

export const AccordionContext = createContext<AccordionContextType | null>(null);

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion compound components must be used within an Accordion component');
  }
  return context;
};
