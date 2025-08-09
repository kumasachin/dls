import { createContext, useContext } from 'react';

// Context for sharing tabs state between components
export interface TabsContextType {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  orientation: 'horizontal' | 'vertical';
  variant: 'default' | 'pills' | 'underlined';
}

export const TabsContext = createContext<TabsContextType | null>(null);

export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components must be used within a Tabs component');
  }
  return context;
};
