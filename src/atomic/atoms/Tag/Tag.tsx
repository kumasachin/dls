import React from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string;
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
  onRemove?: () => void;
}

const getColorStyles = (color: TagProps['color']) => {
  switch (color) {
    case 'primary':
      return { background: '#e3f2fd', color: '#1976d2', borderColor: '#90caf9' };
    case 'success':
      return { background: '#e8f5e9', color: '#2e7d32', borderColor: '#a5d6a7' };
    case 'warning':
      return { background: '#fff8e1', color: '#f57c00', borderColor: '#ffe082' };
    case 'error':
      return { background: '#fdecea', color: '#d32f2f', borderColor: '#ef9a9a' };
    case 'info':
      return { background: '#e1f5fe', color: '#0288d1', borderColor: '#81d4fa' };
    default:
      return { background: '#f5f5f5', color: '#616161', borderColor: '#e0e0e0' };
  }
};

const getSizeStyles = (size: TagProps['size']) => {
  switch (size) {
    case 'small':
      return { fontSize: '12px', padding: '2px 8px' };
    case 'large':
      return { fontSize: '16px', padding: '6px 16px' };
    default:
      return { fontSize: '14px', padding: '4px 12px' };
  }
};

export const Tag: React.FC<TagProps> = ({
  label,
  color = 'default',
  size = 'medium',
  onRemove,
  style,
  ...props
}) => {
  const colorStyles = getColorStyles(color);
  const sizeStyles = getSizeStyles(size);

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: '16px',
        border: `1px solid`,
        fontWeight: 500,
        ...colorStyles,
        ...sizeStyles,
        ...style,
      }}
      {...props}
    >
      {label}
      {onRemove && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          style={{
            marginLeft: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
            lineHeight: 1,
          }}
        >
          ×
        </span>
      )}
    </span>
  );
};

export default Tag;
