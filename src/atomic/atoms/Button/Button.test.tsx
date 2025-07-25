import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with label', () => {
    render(<Button label="Click me" />);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const mockClick = vi.fn();

    render(<Button label="Click me" onClick={mockClick} />);

    await user.click(screen.getByRole('button'));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('applies primary styling', () => {
    render(<Button label="Primary" primary />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('storybook-button--primary');
  });

  it('applies secondary styling by default', () => {
    render(<Button label="Secondary" />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('storybook-button--secondary');
  });

  it('applies custom background color', () => {
    render(<Button label="Custom" backgroundColor="#ff0000" />);

    const button = screen.getByRole('button');
    expect(button).toHaveStyle({
      backgroundColor: '#ff0000',
    });
  });

  it('applies custom size', () => {
    render(<Button label="Large" size="large" />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('storybook-button--large');
  });

  it('applies medium size by default', () => {
    render(<Button label="Medium" />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('storybook-button--medium');
  });

  it('passes through additional props', () => {
    render(<Button label="Test" data-testid="custom-button" />);

    expect(screen.getByTestId('custom-button')).toBeInTheDocument();
  });
});
