import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Breadcrumb, type BreadcrumbItem } from './Breadcrumb';

describe('Breadcrumb Component', () => {
  const mockItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Category', href: '/category' },
    { label: 'Current Page' },
  ];

  it('renders breadcrumb items correctly', () => {
    render(<Breadcrumb items={mockItems} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Current Page')).toBeInTheDocument();
  });

  it('renders links for items with href', () => {
    render(<Breadcrumb items={mockItems} />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    const categoryLink = screen.getByRole('link', { name: 'Category' });

    expect(homeLink).toHaveAttribute('href', '/');
    expect(categoryLink).toHaveAttribute('href', '/category');
  });

  it('does not render link for current page', () => {
    render(<Breadcrumb items={mockItems} />);

    expect(screen.queryByRole('link', { name: 'Current Page' })).not.toBeInTheDocument();
    expect(screen.getByText('Current Page')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const mockClick = vi.fn();
    const user = userEvent.setup();
    const itemsWithClick: BreadcrumbItem[] = [
      { label: 'Home', onClick: mockClick },
      { label: 'Current Page' },
    ];

    render(<Breadcrumb items={itemsWithClick} />);

    const homeLink = screen.getByText('Home');
    await user.click(homeLink);

    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('renders custom separator', () => {
    render(<Breadcrumb items={mockItems} separator=">" />);

    expect(screen.getAllByText('>')).toHaveLength(2);
  });

  it('truncates items when maxItems is set', () => {
    const manyItems: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
      { label: 'Level 1', href: '/level1' },
      { label: 'Level 2', href: '/level2' },
      { label: 'Level 3', href: '/level3' },
      { label: 'Level 4', href: '/level4' },
      { label: 'Current Page' },
    ];

    render(<Breadcrumb items={manyItems} maxItems={4} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('Level 4')).toBeInTheDocument();
    expect(screen.getByText('Current Page')).toBeInTheDocument();
    expect(screen.queryByText('Level 1')).not.toBeInTheDocument();
  });

  it('sets aria-current="page" for the last item', () => {
    render(<Breadcrumb items={mockItems} />);

    const currentPageElement = screen.getByText('Current Page');
    expect(currentPageElement).toHaveAttribute('aria-current', 'page');
  });
});
