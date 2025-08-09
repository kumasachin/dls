import type React from 'react';
import type { Theme } from './ThemeContext';
import './ThemeSwitcher.css';
import { useTheme } from './useTheme';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ className }) => {
  const { theme, setTheme, toggleDarkMode, isDarkMode } = useTheme();

  const themes: { value: Theme; label: string }[] = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'playful', label: 'Playful' },
  ];

  return (
    <div className={`theme-switcher ${className || ''}`}>
      <div className="theme-switcher__group">
        <label htmlFor="theme-select" className="theme-switcher__label">
          Theme:
        </label>
        <select
          id="theme-select"
          value={theme}
          onChange={(e) => setTheme(e.target.value as Theme)}
          className="theme-switcher__select"
        >
          {themes.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={toggleDarkMode}
        className="theme-switcher__toggle"
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>
    </div>
  );
};
