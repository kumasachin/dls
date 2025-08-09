import type React from 'react';

export interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'medium', color = '#007bff' }) => {
  const sizes = {
    small: 16,
    medium: 24,
    large: 32,
  };

  const spinnerSize = sizes[size];

  return (
    <div
      style={{
        width: spinnerSize,
        height: spinnerSize,
        border: `2px solid ${color}20`,
        borderTop: `2px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }}
    >
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Spinner;
