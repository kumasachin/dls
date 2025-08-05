import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MenuList } from './MenuList';
const mockItems = [
  { id: '1', label: 'Item 1' },
  { id: '2', label: 'Item 2' },
  { id: '3', label: 'Item 3' },
];
describe('MenuList Component', () => {
  it('renders menu items', () => {
    render(<MenuList items={mockItems} />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });
  it('handles item click events', async () => {
    const user = userEvent.setup();
    const mockClick = vi.fn();
    const itemsWithClick = [
      { id: '1', label: 'Item 1', onClick: mockClick },
      { id: '2', label: 'Item 2' },
    ];
    render(<MenuList items={itemsWithClick} />);
    await user.click(screen.getByText('Item 1'));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
  it('renders empty menu when no items provided', () => {
    const { container } = render(<MenuList items={[]} />);
    // Check that the menu container exists but has no items
    const menuContainer = container.firstChild;
    expect(menuContainer).toBeInTheDocument();
    expect(screen.queryByText('Item')).not.toBeInTheDocument();
  });
});
