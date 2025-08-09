import type React from 'react';

export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange,
  disabled = false,
  size = 'medium',
}) => {
  const handleChange = () => {
    if (!disabled) {
      onChange?.(!checked);
    }
  };

  const sizeMap = {
    small: { width: 32, height: 16, thumb: 12 },
    medium: { width: 44, height: 24, thumb: 18 },
    large: { width: 56, height: 32, thumb: 24 },
  };

  const dimensions = sizeMap[size];

  return (
    <button
      type="button"
      onClick={handleChange}
      disabled={disabled}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        borderRadius: dimensions.height / 2,
        border: 'none',
        background: checked ? '#007bff' : '#ccc',
        position: 'relative',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.2s ease',
      }}
    >
      <div
        style={{
          width: dimensions.thumb,
          height: dimensions.thumb,
          borderRadius: '50%',
          background: 'white',
          position: 'absolute',
          top: '50%',
          left: checked ? `calc(100% - ${dimensions.thumb + 2}px)` : '2px',
          transform: 'translateY(-50%)',
          transition: 'left 0.2s ease',
        }}
      />
    </button>
  );
};

export default Switch;
