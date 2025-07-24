import React from 'react';
import { Card } from '../../atoms/Card/Card';
import { Text } from '../../atoms/Text/Text';
import { IconButton } from '../../atoms/IconButton/IconButton';

export interface AlertBoxProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  message: string;
  onClose?: () => void;
}

const getAlertStyle = (type: AlertBoxProps['type']) => {
  switch (type) {
    case 'success':
      return { background: '#e6f4ea', color: '#1e4620', icon: '✓' };
    case 'warning':
      return { background: '#fef7e6', color: '#7c4a03', icon: '⚠️' };
    case 'error':
      return { background: '#fce8e6', color: '#c5221f', icon: '✕' };
    default: // info
      return { background: '#e8f0fe', color: '#1967d2', icon: 'ℹ️' };
  }
};

export const AlertBox: React.FC<AlertBoxProps> = ({ type = 'info', message, onClose }) => {
  const style = getAlertStyle(type);

  return (
    <Card
      style={{
        background: style.background,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
      }}
    >
      <div style={{ fontSize: '18px' }}>{style.icon}</div>
      <Text style={{ color: style.color, flexGrow: 1 }}>{message}</Text>
      {onClose && <IconButton icon="✕" onClick={onClose} style={{ color: style.color }} />}
    </Card>
  );
};

export default AlertBox;
