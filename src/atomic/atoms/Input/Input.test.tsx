import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input Component', () => {
  it('renders with placeholder', () => {
    render(<Input placeholder="Enter text" value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('displays value', () => {
    render(<Input value="Test value" onChange={() => {}} />);
    expect(screen.getByDisplayValue('Test value')).toBeInTheDocument();
  });

  it('handles change events', async () => {
    const user = userEvent.setup();
    const mockChange = vi.fn();

    render(<Input placeholder="Type here" value="" onChange={mockChange} />);

    const input = screen.getByPlaceholderText('Type here');
    await user.type(input, 'Hello');

    expect(mockChange).toHaveBeenCalledTimes(5); // Called for each character
  });

  it('applies correct type', () => {
    render(<Input type="password" placeholder="Password" value="" onChange={() => {}} />);

    const input = screen.getByPlaceholderText('Password');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('supports disabled state', () => {
    render(<Input placeholder="Disabled input" value="" onChange={() => {}} disabled />);

    const input = screen.getByPlaceholderText('Disabled input');
    expect(input).toBeDisabled();
  });

  it('passes through additional props', () => {
    render(<Input placeholder="Test" value="" onChange={() => {}} data-testid="custom-input" />);

    expect(screen.getByTestId('custom-input')).toBeInTheDocument();
  });

  it('handles focus and blur events', async () => {
    const user = userEvent.setup();
    const mockFocus = vi.fn();
    const mockBlur = vi.fn();

    render(
      <Input
        placeholder="Focus test"
        value=""
        onChange={() => {}}
        onFocus={mockFocus}
        onBlur={mockBlur}
      />
    );

    const input = screen.getByPlaceholderText('Focus test');

    await user.click(input);
    expect(mockFocus).toHaveBeenCalledTimes(1);

    await user.tab();
    expect(mockBlur).toHaveBeenCalledTimes(1);
  });
});
