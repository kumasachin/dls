import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { CardGrid, type CardGridItem } from './CardGrid';
describe('CardGrid Component', () => {
  const mockItems: CardGridItem[] = [
    {
      id: 1,
      title: 'Test Item 1',
      description: 'Test description 1',
      image: 'https://example.com/image1.jpg',
    },
    {
      id: 2,
      title: 'Test Item 2',
      description: 'Test description 2',
    },
    {
      id: 3,
      title: 'Test Item 3',
      description: 'Test description 3',
      onClick: vi.fn(),
    },
  ];
  it('renders grid items correctly', () => {
    render(<CardGrid items={mockItems} />);
    expect(screen.getByText('Test Item 1')).toBeInTheDocument();
    expect(screen.getByText('Test Item 2')).toBeInTheDocument();
    expect(screen.getByText('Test Item 3')).toBeInTheDocument();
    expect(screen.getByText('Test description 1')).toBeInTheDocument();
  });
  it('renders images when provided', () => {
    render(<CardGrid items={mockItems} />);
    const image = screen.getByAltText('Test Item 1');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image1.jpg');
  });
  it('handles item clicks', async () => {
    const mockClick = vi.fn();
    const itemsWithClick: CardGridItem[] = [{ id: 1, title: 'Clickable Item', onClick: mockClick }];
    const user = userEvent.setup();
    render(<CardGrid items={itemsWithClick} />);
    const item = screen.getByText('Clickable Item');
    await user.click(item);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
  it('handles grid-level click handler', async () => {
    const mockGridClick = vi.fn();
    const user = userEvent.setup();
    render(<CardGrid items={mockItems} onItemClick={mockGridClick} />);
    const item = screen.getByText('Test Item 1');
    await user.click(item);
    expect(mockGridClick).toHaveBeenCalledWith(mockItems[0]);
  });
  it('renders links when href is provided', () => {
    const itemsWithHref: CardGridItem[] = [{ id: 1, title: 'Link Item', href: '/test-link' }];
    render(<CardGrid items={itemsWithHref} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test-link');
  });
  it('shows loading skeleton', () => {
    render(<CardGrid items={[]} loading={true} />);
    // Should render skeleton items
    const skeletons = screen.getAllByRole('generic');
    expect(skeletons.length).toBeGreaterThan(0);
  });
  it('shows empty message when no items', () => {
    render(<CardGrid items={[]} emptyMessage="No items found" />);
    expect(screen.getByText('No items found')).toBeInTheDocument();
  });
  it('applies correct grid columns', () => {
    const { container } = render(<CardGrid items={mockItems} columns={2} />);
    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toHaveStyle('grid-template-columns: repeat(2, 1fr)');
  });
  it('applies correct gap size', () => {
    const { container } = render(<CardGrid items={mockItems} gap="large" />);
    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toHaveStyle('gap: 24px');
  });
  it('renders action buttons', () => {
    const itemsWithActions: CardGridItem[] = [
      {
        id: 1,
        title: 'Item with Action',
        actions: <button>Test Action</button>,
      },
    ];
    render(<CardGrid items={itemsWithActions} />);
    expect(screen.getByRole('button', { name: 'Test Action' })).toBeInTheDocument();
  });
});
