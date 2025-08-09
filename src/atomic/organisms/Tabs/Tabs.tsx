import type { KeyboardEvent, ReactNode } from 'react';
import React, { useRef, useState } from 'react';
import { TabsContext } from './TabsContext';

// Main Tabs component props
export interface TabsProps {
  children: ReactNode;
  defaultTab?: string;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'pills' | 'underlined';
  className?: string;
}

// TabList component props
export interface TabListProps {
  children: ReactNode;
  'aria-label'?: string;
  className?: string;
}

// Tab component props
export interface TabProps {
  children: ReactNode;
  tabId: string;
  disabled?: boolean;
  className?: string;
}

// TabPanels component props
export interface TabPanelsProps {
  children: ReactNode;
  className?: string;
}

// TabPanel component props
export interface TabPanelProps {
  children: ReactNode;
  tabId: string;
  className?: string;
}

// Main Tabs Component
export const Tabs: React.FC<TabsProps> & {
  List: React.FC<TabListProps>;
  Tab: React.FC<TabProps>;
  Panels: React.FC<TabPanelsProps>;
  Panel: React.FC<TabPanelProps>;
} = ({
  children,
  defaultTab,
  activeTab: controlledActiveTab,
  onTabChange,
  orientation = 'horizontal',
  variant = 'default',
  className,
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(defaultTab || '');
  const isControlled = controlledActiveTab !== undefined;
  const activeTab = isControlled ? controlledActiveTab : internalActiveTab;

  const handleTabChange = (tabId: string) => {
    if (!isControlled) {
      setInternalActiveTab(tabId);
    }
    onTabChange?.(tabId);
  };

  return (
    <TabsContext.Provider value={{ activeTab, onTabChange: handleTabChange, orientation, variant }}>
      <div
        className={className}
        style={{ display: 'flex', flexDirection: orientation === 'vertical' ? 'row' : 'column' }}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// TabList Component
const TabList: React.FC<TabListProps> = ({
  children,
  'aria-label': ariaLabel = 'Tabs',
  className,
}) => {
  const tabsContext = React.useContext(TabsContext);
  if (!tabsContext) {
    throw new Error('TabsList must be used within a Tabs component');
  }
  const { orientation, variant } = tabsContext;
  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;
    const tabElements = listRef.current?.querySelectorAll(
      '[role="tab"]:not([disabled])'
    ) as NodeListOf<HTMLElement>;

    if (!tabElements?.length) return;

    const currentIndex = Array.from(tabElements).findIndex((tab) => tab === event.target);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;

    switch (key) {
      case 'ArrowRight':
      case 'ArrowDown':
        if (
          (orientation === 'horizontal' && key === 'ArrowRight') ||
          (orientation === 'vertical' && key === 'ArrowDown')
        ) {
          event.preventDefault();
          nextIndex = (currentIndex + 1) % tabElements.length;
        }
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        if (
          (orientation === 'horizontal' && key === 'ArrowLeft') ||
          (orientation === 'vertical' && key === 'ArrowUp')
        ) {
          event.preventDefault();
          nextIndex = currentIndex === 0 ? tabElements.length - 1 : currentIndex - 1;
        }
        break;
      case 'Home':
        event.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        nextIndex = tabElements.length - 1;
        break;
      default:
        return;
    }

    if (nextIndex !== currentIndex) {
      const nextTab = tabElements[nextIndex];
      if (nextTab) {
        nextTab.focus();
        nextTab.click();
      }
    }
  };

  const getListStyles = () => {
    const baseStyles = {
      display: 'flex',
      gap: '4px',
      borderBottom:
        variant === 'underlined' && orientation === 'horizontal' ? '1px solid #e0e0e0' : undefined,
      borderRight:
        variant === 'underlined' && orientation === 'vertical' ? '1px solid #e0e0e0' : undefined,
      flexDirection: orientation === 'vertical' ? ('column' as const) : ('row' as const),
      minWidth: orientation === 'vertical' ? '200px' : undefined,
      paddingRight: orientation === 'vertical' ? '16px' : undefined,
      paddingBottom: orientation === 'horizontal' ? '0' : undefined,
    };
    return baseStyles;
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={ariaLabel}
      aria-orientation={orientation}
      className={className}
      style={getListStyles()}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
};

// Tab Component
const Tab: React.FC<TabProps> = ({ children, tabId, disabled = false, className }) => {
  const tabsContext = React.useContext(TabsContext);
  if (!tabsContext) {
    throw new Error('Tab must be used within a Tabs component');
  }
  const { activeTab, onTabChange, variant } = tabsContext;
  const isActive = activeTab === tabId;

  const handleClick = () => {
    if (!disabled) {
      onTabChange(tabId);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  const getTabStyles = () => {
    const baseStyles = {
      padding: '12px 16px',
      border: 'none',
      background: 'transparent',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontSize: '14px',
      fontWeight: 500,
      color: isActive ? '#0066cc' : '#666',
      borderRadius: variant === 'pills' ? '6px' : undefined,
      backgroundColor:
        variant === 'pills' && isActive
          ? '#f0f8ff'
          : variant === 'pills'
            ? 'transparent'
            : undefined,
      borderBottom:
        variant === 'underlined' && isActive
          ? '2px solid #0066cc'
          : variant === 'underlined'
            ? '2px solid transparent'
            : undefined,
      borderRight: variant === 'underlined' && isActive ? '2px solid #0066cc' : undefined,
      transition: 'all 0.2s ease',
      outline: 'none',
      position: 'relative' as const,
    };

    return baseStyles;
  };

  return (
    <button
      type="button"
      role="tab"
      tabIndex={isActive ? 0 : -1}
      aria-selected={isActive}
      aria-controls={`tabpanel-${tabId}`}
      id={`tab-${tabId}`}
      disabled={disabled}
      className={className}
      style={getTabStyles()}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={() => {
        // Auto-activate tab on focus for better keyboard UX
        if (!disabled && !isActive) {
          onTabChange(tabId);
        }
      }}
    >
      {children}
    </button>
  );
};

// TabPanels Component
const TabPanels: React.FC<TabPanelsProps> = ({ children, className }) => {
  const tabsContext = React.useContext(TabsContext);
  if (!tabsContext) {
    throw new Error('TabPanels must be used within a Tabs component');
  }
  const { orientation } = tabsContext;

  return (
    <div
      className={className}
      style={{
        flex: 1,
        paddingTop: orientation === 'horizontal' ? '16px' : undefined,
        paddingLeft: orientation === 'vertical' ? '16px' : undefined,
      }}
    >
      {children}
    </div>
  );
};

// TabPanel Component
const TabPanel: React.FC<TabPanelProps> = ({ children, tabId, className }) => {
  const tabsContext = React.useContext(TabsContext);
  if (!tabsContext) {
    throw new Error('TabPanel must be used within a Tabs component');
  }
  const { activeTab } = tabsContext;
  const isActive = activeTab === tabId;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${tabId}`}
      aria-labelledby={`tab-${tabId}`}
      className={className}
      style={{ outline: 'none' }}
    >
      {children}
    </div>
  );
};

// Attach compound components
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;

export default Tabs;
