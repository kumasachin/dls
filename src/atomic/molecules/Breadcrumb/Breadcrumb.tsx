import React from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  maxItems,
  ...props
}) => {
  const displayItems: BreadcrumbItem[] =
    maxItems && items.length > maxItems
      ? [items[0]!, { label: '...' }, ...items.slice(-(maxItems - 2))]
      : items;

  const handleItemClick = (item: BreadcrumbItem, event: React.MouseEvent) => {
    if (item.onClick) {
      event.preventDefault();
      item.onClick();
    }
  };

  return (
    <nav
      aria-label="breadcrumb"
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        fontSize: '14px',
        ...props.style,
      }}
      {...props}
    >
      <ol
        style={{
          display: 'flex',
          alignItems: 'center',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          gap: '8px',
        }}
      >
        {displayItems.map((item, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
            {item.href || item.onClick ? (
              <a
                href={item.href}
                onClick={(e) => handleItemClick(item, e)}
                style={{
                  color: index === displayItems.length - 1 ? '#666' : '#0066cc',
                  textDecoration: 'none',
                  cursor: item.label === '...' ? 'default' : 'pointer',
                }}
                aria-current={index === displayItems.length - 1 ? 'page' : undefined}
              >
                {item.label}
              </a>
            ) : (
              <span
                style={{
                  color: '#666',
                }}
                aria-current="page"
              >
                {item.label}
              </span>
            )}
            {index < displayItems.length - 1 && (
              <span
                style={{
                  margin: '0 8px',
                  color: '#999',
                }}
                aria-hidden="true"
              >
                {separator}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
