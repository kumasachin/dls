import React from 'react';
import { Card } from '../../atoms/Card/Card';
import { Divider } from '../../atoms/Divider/Divider';

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export interface MenuListProps {
  items: MenuItem[];
  maxHeight?: string;
  width?: string;
}

export const MenuList: React.FC<MenuListProps> = ({
  items,
  maxHeight = '300px',
  width = '200px',
}) => {
  return (
    <Card
      radius="sm"
      padding="4px"
      style={{
        maxHeight,
        width,
        overflowY: 'auto',
      }}
    >
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          <div
            style={{
              padding: '8px 16px',
              cursor: item.disabled ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              opacity: item.disabled ? 0.5 : 1,
            }}
            onClick={item.disabled ? undefined : item.onClick}
          >
            {item.icon && <span>{item.icon}</span>}
            <span>{item.label}</span>
          </div>
          {index < items.length - 1 && <Divider margin="0" />}
        </React.Fragment>
      ))}
    </Card>
  );
};

export default MenuList;
