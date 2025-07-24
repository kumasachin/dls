import React from 'react';
import { SearchBar } from '../../molecules/SearchBar/SearchBar';
import { UserInfo } from '../../molecules/UserInfo/UserInfo';

export interface HeaderProps {
  title: string;
  logoUrl?: string;
  onLogoClick?: () => void;
  onSearch?: (query: string) => void;
  userName?: string;
  userImageUrl?: string;
  userSubtitle?: string;
  onUserClick?: () => void;
  actions?: React.ReactNode[];
}

export const Header: React.FC<HeaderProps> = ({
  title,
  logoUrl,
  onLogoClick,
  onSearch,
  userName,
  userImageUrl,
  userSubtitle,
  onUserClick,
  actions = [],
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = () => {
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 24px',
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        gap: '24px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: onLogoClick ? 'pointer' : 'default',
        }}
        onClick={onLogoClick}
      >
        {logoUrl && <img src={logoUrl} alt="Logo" style={{ height: '32px' }} />}
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 600 }}>{title}</h1>
      </div>

      {onSearch && (
        <div style={{ flexGrow: 1, maxWidth: '500px' }}>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            placeholder="Search..."
          />
        </div>
      )}

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
        {actions.map((action, index) => (
          <div key={index}>{action}</div>
        ))}

        {userName && (
          <div onClick={onUserClick} style={{ cursor: onUserClick ? 'pointer' : 'default' }}>
            <UserInfo name={userName} imageUrl={userImageUrl} subtitle={userSubtitle} size="sm" />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
