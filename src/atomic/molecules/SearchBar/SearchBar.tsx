import type React from 'react';
import { IconButton } from '../../atoms/IconButton/IconButton';
import { Input } from '../../atoms/Input/Input';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search...',
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        style={{ flexGrow: 1 }}
      />
      <IconButton icon="🔍" onClick={onSearch} />
    </div>
  );
};

export default SearchBar;
