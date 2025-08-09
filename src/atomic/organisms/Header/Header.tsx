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
      {onLogoClick ? (
        <button
          type="button"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            border: 'none',
            background: 'transparent',
            padding: 0,
          }}
          onClick={onLogoClick}
        >
          {logoUrl && <img src={logoUrl} alt="Logo" style={{ height: '32px' }} />}
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 600 }}>{title}</h1>
        </button>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {logoUrl && <img src={logoUrl} alt="Logo" style={{ height: '32px' }} />}
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 600 }}>{title}</h1>
        </div>
      )}

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
        {actions.map((action, index) => {
          const actionKey = `header-action-${index}-${Date.now()}`;
          return <div key={actionKey}>{action}</div>;
        })}

        {userName &&
          (onUserClick ? (
            <button
              type="button"
              onClick={onUserClick}
              style={{
                cursor: 'pointer',
                border: 'none',
                background: 'transparent',
                padding: 0,
              }}
            >
              <UserInfo
                name={userName}
                {...(userImageUrl && { imageUrl: userImageUrl })}
                {...(userSubtitle && { subtitle: userSubtitle })}
                size="sm"
              />
            </button>
          ) : (
            <div>
              <UserInfo
                name={userName}
                {...(userImageUrl && { imageUrl: userImageUrl })}
                {...(userSubtitle && { subtitle: userSubtitle })}
                size="sm"
              />
            </div>
          ))}
      </div>
    </header>
  );
};

export default Header;
