import React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'primary' | 'ghost';
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 'medium',
  variant = 'default',
  ...props
}) => {
  const sizes = {
    small: { width: 32, height: 32, fontSize: 16 },
    medium: { width: 40, height: 40, fontSize: 20 },
    large: { width: 48, height: 48, fontSize: 24 },
  };

  const variants = {
    default: {
      background: '#f8f9fa',
      color: '#495057',
      border: '1px solid #dee2e6',
      '&:hover': { background: '#e9ecef' },
    },
    primary: {
      background: '#007bff',
      color: 'white',
      border: '1px solid #007bff',
      '&:hover': { background: '#0056b3' },
    },
    ghost: {
      background: 'transparent',
      color: '#495057',
      border: 'none',
      '&:hover': { background: '#f8f9fa' },
    },
  };

  const sizeStyle = sizes[size];
  const variantStyle = variants[variant];

  return (
    <button
      type="button"
      style={{
        width: sizeStyle.width,
        height: sizeStyle.height,
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        fontSize: sizeStyle.fontSize,
        ...variantStyle,
      }}
      {...props}
    >
      {icon}
    </button>
  );
};

export default IconButton;
