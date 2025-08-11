import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { List } from './List';

describe('List Component', () => {
  const mockItems = [
    {
      id: '1',
      title: 'Item 1',
      description: 'Description 1',
      image: { src: 'image1.jpg', alt: 'Image 1' },
      tags: [{ label: 'Tag 1', color: 'primary' as const }],
      rating: { value: 4, max: 5 as const, readOnly: true },
    },
    {
      id: '2',
      title: 'Item 2',
      description: 'Description 2',
      image: { src: 'image2.jpg', alt: 'Image 2' },
      tags: [{ label: 'Tag 2', color: 'success' as const }],
      rating: { value: 3, max: 5 as const, readOnly: true },
    },
    {
      id: '3',
      title: 'Item 3',
      description: 'Description 3',
    },
  ];

  it('renders list with items', () => {
    render(<List items={mockItems} />);

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('applies variant styles correctly', () => {
    const { container } = render(<List items={mockItems} variant="divided" />);

    expect(container.firstChild).toHaveClass('list-divided');
  });

  it('applies layout styles correctly', () => {
    const { container } = render(<List items={mockItems} layout="grid" />);

    expect(container.firstChild).toHaveClass('list-grid');
  });

  it('applies size styles correctly', () => {
    const { container } = render(<List items={mockItems} size="lg" />);

    expect(container.firstChild).toHaveClass('list-lg');
  });

  it('handles single selection', () => {
    const handleSelectionChange = vi.fn();
    render(<List items={mockItems} selectable onSelectionChange={handleSelectionChange} />);

    const firstItem = screen.getByText('Item 1').closest('[role="button"]');
    fireEvent.click(firstItem!);

    expect(handleSelectionChange).toHaveBeenCalledWith(['1']);
  });

  it('handles multi selection', () => {
    const handleSelectionChange = vi.fn();
    render(
      <List items={mockItems} selectable multiSelect onSelectionChange={handleSelectionChange} />
    );

    const firstItem = screen.getByText('Item 1').closest('[role="button"]');
    const secondItem = screen.getByText('Item 2').closest('[role="button"]');

    fireEvent.click(firstItem!);
    expect(handleSelectionChange).toHaveBeenCalledWith(['1']);

    fireEvent.click(secondItem!);
    expect(handleSelectionChange).toHaveBeenCalledWith(['1', '2']);
  });

  it('handles controlled selection', () => {
    const handleSelectionChange = vi.fn();
    render(
      <List
        items={mockItems}
        selectable
        selectedIds={['1']}
        onSelectionChange={handleSelectionChange}
      />
    );

    const firstItem = screen.getByText('Item 1').closest('[role="button"]');
    expect(firstItem).toHaveClass('list-item-selected');
  });

  it('handles item click callback', () => {
    const handleItemClick = vi.fn();
    render(<List items={mockItems} onItemClick={handleItemClick} />);

    const firstItem = screen.getByText('Item 1').closest('[role="button"]');
    fireEvent.click(firstItem!);

    expect(handleItemClick).toHaveBeenCalledWith(mockItems[0], 0);
  });

  it('shows loading state', () => {
    render(<List items={[]} loading />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows custom loading component', () => {
    const customLoading = <div>Custom Loading</div>;
    render(<List items={[]} loading loadingComponent={customLoading} />);

    expect(screen.getByText('Custom Loading')).toBeInTheDocument();
  });

  it('shows empty state', () => {
    render(<List items={[]} />);

    expect(screen.getByText('No items to display')).toBeInTheDocument();
  });

  it('shows custom empty component', () => {
    const customEmpty = <div>Custom Empty</div>;
    render(<List items={[]} emptyComponent={customEmpty} />);

    expect(screen.getByText('Custom Empty')).toBeInTheDocument();
  });

  it('hides empty state when showEmpty is false', () => {
    render(<List items={[]} showEmpty={false} />);

    expect(screen.queryByText('No items to display')).not.toBeInTheDocument();
  });

  it('handles keyboard navigation', () => {
    render(<List items={mockItems} keyboardNavigation />);

    const list = screen.getByRole('list');

    // Test arrow down
    act(() => {
      list.focus();
      fireEvent.keyDown(list, { key: 'ArrowDown' });
    });

    expect(list.querySelector('[data-focused="true"]')).toBeInTheDocument();
  });

  it('handles Home and End keys', () => {
    render(<List items={mockItems} keyboardNavigation />);

    const list = screen.getByRole('list');

    // Test Home key
    act(() => {
      list.focus();
      fireEvent.keyDown(list, { key: 'Home' });
    });

    expect(list.querySelector('[data-focused="true"]')).toBeInTheDocument();

    // Test End key
    act(() => {
      fireEvent.keyDown(list, { key: 'End' });
    });

    expect(list.querySelector('[data-focused="true"]')).toBeInTheDocument();
  });

  it('handles Enter key selection', () => {
    const handleSelectionChange = vi.fn();
    render(
      <List
        items={mockItems}
        selectable
        keyboardNavigation
        onSelectionChange={handleSelectionChange}
      />
    );

    const list = screen.getByRole('listbox');

    act(() => {
      list.focus();
      // Use Home key to set focus to first item
      fireEvent.keyDown(list, { key: 'Home' });
    });

    act(() => {
      // Then press Enter to select it
      fireEvent.keyDown(list, { key: 'Enter' });
    });

    expect(handleSelectionChange).toHaveBeenCalledWith(['1']);
  });

  it('uses custom render function', () => {
    const customRender = (item: { title: string }) => <div>Custom: {item.title}</div>;

    render(<List items={mockItems} renderItem={customRender} />);

    expect(screen.getByText('Custom: Item 1')).toBeInTheDocument();
  });

  it('applies grid columns correctly', () => {
    const { container } = render(<List items={mockItems} layout="grid" gridColumns={3} />);

    expect(container.firstChild).toHaveStyle({ '--list-grid-columns': '3' });
  });

  it('sets correct ARIA attributes for selectable list', () => {
    render(<List items={mockItems} selectable multiSelect />);

    const list = screen.getByRole('listbox');
    expect(list).toHaveAttribute('aria-multiselectable', 'true');
  });

  it('disables keyboard navigation when specified', () => {
    render(<List items={mockItems} keyboardNavigation={false} />);

    const list = screen.getByRole('list');
    expect(list).toHaveAttribute('tabIndex', '-1');
  });

  it('deselects item when clicked again in single select mode', () => {
    const handleSelectionChange = vi.fn();
    render(<List items={mockItems} selectable onSelectionChange={handleSelectionChange} />);

    const firstItem = screen.getByText('Item 1').closest('[role="button"]');

    // First click - select
    fireEvent.click(firstItem!);
    expect(handleSelectionChange).toHaveBeenCalledWith(['1']);

    // Second click - deselect
    fireEvent.click(firstItem!);
    expect(handleSelectionChange).toHaveBeenCalledWith([]);
  });
});
