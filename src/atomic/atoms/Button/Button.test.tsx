import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('handles clicks', async () => {
    const user = userEvent.setup();
    const mockClick = vi.fn();
    render(<Button onClick={mockClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));
    expect(mockClick).toHaveBeenCalled();
  });

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders as different elements', () => {
    const { container } = render(<Button as="a">Link Button</Button>);
    expect(container.querySelector('a')).toBeInTheDocument();
  });
});
