import React from 'react';

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
  disabled?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 5,
  disabled = false,
  ...props
}) => {
  const handlePageClick = (page: number) => {
    if (!disabled && page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getVisiblePages = (): (number | string)[] => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start < maxVisiblePages - 1) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    const pages: (number | string)[] = [];

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  const buttonStyle = {
    padding: '8px 12px',
    margin: '0 2px',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    color: '#333',
    cursor: disabled ? 'not-allowed' : 'pointer',
    borderRadius: '4px',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '32px',
    opacity: disabled ? 0.5 : 1,
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#0066cc',
    color: '#fff',
    borderColor: '#0066cc',
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    cursor: 'not-allowed',
    opacity: 0.5,
  };

  return (
    <nav
      aria-label="pagination"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...props.style,
      }}
      {...props}
    >
      {showFirstLast && (
        <button
          onClick={() => handlePageClick(1)}
          disabled={disabled || currentPage === 1}
          style={disabled || currentPage === 1 ? disabledButtonStyle : buttonStyle}
          aria-label="Go to first page"
        >
          ««
        </button>
      )}

      {showPrevNext && (
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={disabled || currentPage === 1}
          style={disabled || currentPage === 1 ? disabledButtonStyle : buttonStyle}
          aria-label="Go to previous page"
        >
          ‹
        </button>
      )}

      {visiblePages.map((page, index) => {
        if (typeof page === 'string') {
          return (
            <span
              key={`ellipsis-${index}`}
              style={{
                ...buttonStyle,
                cursor: 'default',
                border: 'none',
                backgroundColor: 'transparent',
              }}
            >
              {page}
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            disabled={disabled}
            style={page === currentPage ? activeButtonStyle : buttonStyle}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        );
      })}

      {showPrevNext && (
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={disabled || currentPage === totalPages}
          style={disabled || currentPage === totalPages ? disabledButtonStyle : buttonStyle}
          aria-label="Go to next page"
        >
          ›
        </button>
      )}

      {showFirstLast && (
        <button
          onClick={() => handlePageClick(totalPages)}
          disabled={disabled || currentPage === totalPages}
          style={disabled || currentPage === totalPages ? disabledButtonStyle : buttonStyle}
          aria-label="Go to last page"
        >
          »»
        </button>
      )}
    </nav>
  );
};
