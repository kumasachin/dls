import { render, screen } from '@testing-library/react';
import { Input } from '../../atoms/Input/Input';
import { FormField } from './FormField';

describe('FormField Component', () => {
  it('renders with label', () => {
    render(
      <FormField label="Email">
        <Input value="" onChange={() => {}} />
      </FormField>
    );
    expect(screen.getByText('Email')).toBeInTheDocument();
  });
  it('shows required indicator when required', () => {
    render(
      <FormField label="Name" required>
        <Input value="" onChange={() => {}} />
      </FormField>
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });
  it('displays hint text when provided', () => {
    render(
      <FormField label="Password" hint="Must be at least 8 characters">
        <Input value="" onChange={() => {}} />
      </FormField>
    );
    expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument();
  });
  it('displays error message when provided', () => {
    render(
      <FormField label="Email" error="Invalid email format">
        <Input value="" onChange={() => {}} />
      </FormField>
    );
    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  });
  it('renders children component', () => {
    render(
      <FormField label="Test">
        <Input value="test value" onChange={() => {}} />
      </FormField>
    );
    expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
  });
  it('associates label with input via htmlFor', () => {
    render(
      <FormField label="Username" htmlFor="username-input">
        <Input value="" onChange={() => {}} id="username-input" />
      </FormField>
    );
    const label = screen.getByText('Username').closest('label');
    const input = screen.getByRole('textbox');
    expect(label).toHaveAttribute('for', 'username-input');
    expect(input).toHaveAttribute('id', 'username-input');
  });
});
