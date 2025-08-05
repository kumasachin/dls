import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';
describe('Checkbox Component', () => {
  it('renders with label', () => {
    render(<Checkbox label="Accept terms" checked={false} onChange={() => {}} />);
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
  });
  it('shows checked state', () => {
    render(<Checkbox label="Checked" checked={true} onChange={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });
  it('shows unchecked state', () => {
    render(<Checkbox label="Unchecked" checked={false} onChange={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });
  it('handles change events', async () => {
    const user = userEvent.setup();
    const mockChange = vi.fn();
    render(<Checkbox label="Toggle me" checked={false} onChange={mockChange} />);
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    expect(mockChange).toHaveBeenCalledTimes(1);
  });
  it('supports disabled state', () => {
    render(<Checkbox label="Disabled" checked={false} onChange={() => {}} disabled />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });
  it('passes through additional props', () => {
    render(
      <Checkbox label="Test" checked={false} onChange={() => {}} data-testid="custom-checkbox" />
    );
    expect(screen.getByTestId('custom-checkbox')).toBeInTheDocument();
  });
});
