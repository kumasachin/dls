import type React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', size = 'medium' }) => {
  const variants = {
    primary: { background: '#007bff', color: 'white' },
    secondary: { background: '#6c757d', color: 'white' },
    success: { background: '#28a745', color: 'white' },
    warning: { background: '#ffc107', color: 'black' },
    error: { background: '#dc3545', color: 'white' },
  };

  const sizes = {
    small: { padding: '2px 6px', fontSize: '10px' },
    medium: { padding: '4px 8px', fontSize: '12px' },
    large: { padding: '6px 12px', fontSize: '14px' },
  };

  return (
    <span
      style={{
        display: 'inline-block',
        borderRadius: '12px',
        fontWeight: 500,
        lineHeight: 1,
        ...variants[variant],
        ...sizes[size],
      }}
    >
      {children}
    </span>
  );
};

export default Badge;
