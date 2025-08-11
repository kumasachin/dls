import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ListItem } from './ListItem';

describe('ListItem Component', () => {
  const mockProps = {
    title: 'Test Item',
    description: 'This is a test description',
    image: {
      src: 'test-image.jpg',
      alt: 'Test Image',
    },
  };

  it('renders with required props', () => {
    render(<ListItem title="Test Item" />);

    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

  it('renders with image when provided', () => {
    render(<ListItem {...mockProps} />);

    expect(screen.getByRole('img', { name: 'Test Image' })).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<ListItem {...mockProps} />);

    expect(screen.getByText('This is a test description')).toBeInTheDocument();
  });

  it('renders metadata when provided', () => {
    render(<ListItem {...mockProps} metadata="2 hours ago" />);

    expect(screen.getByText('2 hours ago')).toBeInTheDocument();
  });

  it('renders tags when provided', () => {
    const tags = [
      { label: 'React', color: 'primary' as const },
      { label: 'TypeScript', color: 'success' as const },
    ];

    render(<ListItem {...mockProps} tags={tags} />);

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders rating when provided', () => {
    const rating = {
      value: 4,
      max: 5 as const,
      readOnly: true,
      showValue: true,
    };

    render(<ListItem {...mockProps} rating={rating} />);

    // Rating component should be rendered
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('applies size variants correctly', () => {
    const { container } = render(<ListItem {...mockProps} size="lg" />);

    expect(container.firstChild).toHaveClass('list-item-lg');
  });

  it('applies layout variants correctly', () => {
    const { container } = render(<ListItem {...mockProps} layout="vertical" />);

    expect(container.firstChild).toHaveClass('list-item-vertical');
  });

  it('applies style variants correctly', () => {
    const { container } = render(<ListItem {...mockProps} variant="card" />);

    expect(container.firstChild).toHaveClass('list-item-card');
  });

  it('handles click when interactive', () => {
    const handleClick = vi.fn();
    render(<ListItem {...mockProps} interactive onItemClick={handleClick} />);

    const listItem = screen.getByRole('button');
    fireEvent.click(listItem);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard navigation when interactive', () => {
    const handleClick = vi.fn();
    render(<ListItem {...mockProps} interactive onItemClick={handleClick} />);

    const listItem = screen.getByRole('button');
    fireEvent.keyDown(listItem, { key: 'Enter' });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows selected state', () => {
    const { container } = render(<ListItem {...mockProps} selected />);

    expect(container.firstChild).toHaveClass('list-item-selected');
  });

  it('shows disabled state', () => {
    const { container } = render(<ListItem {...mockProps} disabled />);

    expect(container.firstChild).toHaveClass('list-item-disabled');
  });

  it('does not trigger click when disabled', () => {
    const handleClick = vi.fn();
    const { container } = render(
      <ListItem {...mockProps} interactive disabled onItemClick={handleClick} />
    );

    const listItem = container.firstChild as HTMLElement;
    fireEvent.click(listItem);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders custom actions', () => {
    const actions = <button type="button">Custom Action</button>;

    render(<ListItem {...mockProps} actions={actions} />);

    expect(screen.getByText('Custom Action')).toBeInTheDocument();
  });

  it('renders custom children instead of default layout', () => {
    render(
      <ListItem {...mockProps}>
        <div>Custom Content</div>
      </ListItem>
    );

    expect(screen.getByText('Custom Content')).toBeInTheDocument();
    expect(screen.queryByText('Test Item')).not.toBeInTheDocument();
  });

  it('applies interactive class when onItemClick is provided', () => {
    const { container } = render(<ListItem {...mockProps} onItemClick={() => {}} />);

    expect(container.firstChild).toHaveClass('list-item-interactive');
  });

  it('sets correct ARIA attributes when interactive', () => {
    render(<ListItem {...mockProps} interactive />);

    const listItem = screen.getByRole('button');
    expect(listItem).toHaveAttribute('tabIndex', '0');
  });

  it('sets correct ARIA attributes when disabled', () => {
    const { container } = render(<ListItem {...mockProps} interactive disabled />);

    const listItem = container.firstChild as HTMLElement;
    expect(listItem).toHaveAttribute('aria-disabled', 'true');
  });
});
