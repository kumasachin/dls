import React from 'react';

export interface CardGridItem {
  id: string | number;
  title: string;
  description?: string;
  image?: string;
  actions?: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface CardGridProps extends React.HTMLAttributes<HTMLElement> {
  items: CardGridItem[];
  columns?: 1 | 2 | 3 | 4 | 6;
  gap?: 'small' | 'medium' | 'large';
  loading?: boolean;
  emptyMessage?: string;
  onItemClick?: (item: CardGridItem) => void;
}

export const CardGrid: React.FC<CardGridProps> = ({
  items,
  columns = 3,
  gap = 'medium',
  loading = false,
  emptyMessage = 'No items to display',
  onItemClick,
  ...props
}) => {
  const gapSizes = {
    small: '12px',
    medium: '16px',
    large: '24px',
  };

  const handleItemClick = (item: CardGridItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (onItemClick) {
      onItemClick(item);
    }
  };

  const cardStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '16px',
    backgroundColor: '#fff',
    cursor: onItemClick || items.some((item) => item.onClick || item.href) ? 'pointer' : 'default',
    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
    height: 'fit-content',
  };

  const hoverStyle = {
    ...cardStyle,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transform: 'translateY(-2px)',
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: gapSizes[gap],
          ...props.style,
        }}
        {...props}
      >
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={`skeleton-${index}`}
            style={{
              ...cardStyle,
              animation: 'pulse 1.5s ease-in-out infinite',
              background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
              backgroundSize: '200% 100%',
            }}
          >
            <div
              style={{
                height: '120px',
                backgroundColor: '#f0f0f0',
                marginBottom: '12px',
                borderRadius: '4px',
              }}
            />
            <div
              style={{
                height: '20px',
                backgroundColor: '#f0f0f0',
                marginBottom: '8px',
                borderRadius: '4px',
              }}
            />
            <div
              style={{
                height: '16px',
                backgroundColor: '#f0f0f0',
                width: '70%',
                borderRadius: '4px',
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '48px 16px',
          color: '#666',
          fontSize: '16px',
          ...props.style,
        }}
        {...props}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: gapSizes[gap],
        ...props.style,
      }}
      {...props}
    >
      {items.map((item) => {
        const CardContent = (
          <div
            key={item.id}
            style={cardStyle}
            onMouseEnter={(e) => {
              if (item.onClick || onItemClick || item.href) {
                Object.assign(e.currentTarget.style, hoverStyle);
              }
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, cardStyle);
            }}
            onClick={() => handleItemClick(item)}
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  marginBottom: '12px',
                }}
              />
            )}
            <h3
              style={{
                margin: '0 0 8px 0',
                fontSize: '18px',
                fontWeight: '600',
                color: '#333',
                lineHeight: '1.4',
              }}
            >
              {item.title}
            </h3>
            {item.description && (
              <p
                style={{
                  margin: '0 0 12px 0',
                  fontSize: '14px',
                  color: '#666',
                  lineHeight: '1.5',
                }}
              >
                {item.description}
              </p>
            )}
            {item.actions && <div style={{ marginTop: 'auto' }}>{item.actions}</div>}
          </div>
        );

        if (item.href) {
          return (
            <a key={item.id} href={item.href} style={{ textDecoration: 'none', color: 'inherit' }}>
              {CardContent}
            </a>
          );
        }

        return CardContent;
      })}
    </div>
  );
};
