import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Form } from './Form';

describe('Form Component', () => {
  describe('Basic functionality', () => {
    it('renders form with fields', () => {
      render(
        <Form onSubmit={vi.fn()} actions={[<Form.Submit key="submit">Submit</Form.Submit>]}>
          <Form.Field name="name" label="Name">
            {({ id, value, onChange }) => (
              <input
                id={id}
                type="text"
                value={(value as string) || ''}
                onChange={(e) => onChange(e.target.value)}
                data-testid="name-input"
              />
            )}
          </Form.Field>
        </Form>
      );

      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByTestId('name-input')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });

    it('handles form submission with values', async () => {
      const onSubmit = vi.fn();

      render(
        <Form onSubmit={onSubmit} actions={[<Form.Submit key="submit">Submit</Form.Submit>]}>
          <Form.Field name="name" label="Name">
            {({ id, value, onChange }) => (
              <input
                id={id}
                type="text"
                value={(value as string) || ''}
                onChange={(e) => onChange(e.target.value)}
                data-testid="name-input"
              />
            )}
          </Form.Field>
        </Form>
      );

      const nameInput = screen.getByTestId('name-input');
      const form = nameInput.closest('form')!;

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.submit(form);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalled();
      });
    });

    it('initializes with initial values', () => {
      render(
        <Form initialValues={{ name: 'Initial Name' }} onSubmit={vi.fn()}>
          <Form.Field name="name" label="Name">
            {({ id, value, onChange }) => (
              <input
                id={id}
                type="text"
                value={(value as string) || ''}
                onChange={(e) => onChange(e.target.value)}
                data-testid="name-input"
              />
            )}
          </Form.Field>
        </Form>
      );

      const nameInput = screen.getByTestId('name-input');
      expect(nameInput).toHaveValue('Initial Name');
    });
  });

  describe('Validation', () => {
    it('validates required fields', async () => {
      const onSubmit = vi.fn();

      render(
        <Form onSubmit={onSubmit} actions={[<Form.Submit key="submit">Submit</Form.Submit>]}>
          <Form.Field name="name" label="Name" required>
            {({ id, value, onChange, error, touched }) => (
              <div>
                <input
                  id={id}
                  type="text"
                  value={(value as string) || ''}
                  onChange={(e) => onChange(e.target.value)}
                  data-testid="name-input"
                />
                {error && touched && <div data-testid="name-error">{error}</div>}
              </div>
            )}
          </Form.Field>
        </Form>
      );

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId('name-error')).toHaveTextContent('This field is required');
      });

      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('validates using validation schema', async () => {
      const onSubmit = vi.fn();

      render(
        <Form
          onSubmit={onSubmit}
          actions={[<Form.Submit key="submit">Submit</Form.Submit>]}
          validationSchema={{
            email: {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            },
          }}
        >
          <Form.Field name="email" label="Email">
            {({ id, value, onChange, onBlur, error, touched }) => (
              <div>
                <input
                  id={id}
                  type="email"
                  value={(value as string) || ''}
                  onChange={(e) => onChange(e.target.value)}
                  onBlur={onBlur}
                  data-testid="email-input"
                />
                {error && touched && <div data-testid="email-error">{error}</div>}
              </div>
            )}
          </Form.Field>
        </Form>
      );

      const emailInput = screen.getByTestId('email-input');
      const submitButton = screen.getByRole('button', { name: 'Submit' });

      // Test invalid email - need to blur to trigger validation
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.blur(emailInput);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId('email-error')).toHaveTextContent('Invalid format');
      });

      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('validates custom validation rules', async () => {
      const onSubmit = vi.fn();

      render(
        <Form
          onSubmit={onSubmit}
          actions={[<Form.Submit key="submit">Submit</Form.Submit>]}
          validationSchema={{
            password: {
              required: true,
              custom: (value) => {
                if (typeof value === 'string' && value.length < 8) {
                  return 'Password must be at least 8 characters';
                }
                return undefined;
              },
            },
          }}
        >
          <Form.Field name="password" label="Password">
            {({ value, onChange, onBlur, error, touched }) => (
              <div>
                <input
                  type="password"
                  value={(value as string) || ''}
                  onChange={(e) => onChange(e.target.value)}
                  onBlur={onBlur}
                  data-testid="password-input"
                />
                {error && touched && <div data-testid="password-error">{error}</div>}
              </div>
            )}
          </Form.Field>
        </Form>
      );

      const passwordInput = screen.getByTestId('password-input');
      const submitButton = screen.getByRole('button', { name: 'Submit' });

      fireEvent.change(passwordInput, { target: { value: '123' } });
      fireEvent.blur(passwordInput);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId('password-error')).toHaveTextContent(
          'Password must be at least 8 characters'
        );
      });

      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Form submission states', () => {
    it('shows loading state when submitting', async () => {
      const onSubmit = vi.fn().mockImplementation((_event, _values, { setSubmitting }) => {
        setSubmitting(true);
      });

      render(
        <Form onSubmit={onSubmit} actions={[]}>
          <Form.Field name="name" label="Name">
            {({ id, value, onChange }) => (
              <input
                id={id}
                type="text"
                value={(value as string) || ''}
                onChange={(e) => onChange(e.target.value)}
                data-testid="name-input"
              />
            )}
          </Form.Field>
          <Form.Submit>Submit</Form.Submit>
        </Form>
      );

      const nameInput = screen.getByTestId('name-input');
      const submitButton = screen.getByRole('button', { name: 'Submit' });

      fireEvent.change(nameInput, { target: { value: 'John' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(submitButton).toBeDisabled();
        expect(submitButton).toHaveTextContent('Submitting...');
      });
    });

    it('shows custom loading text', async () => {
      const onSubmit = vi.fn().mockImplementation((_event, _values, { setSubmitting }) => {
        setSubmitting(true);
      });

      render(
        <Form onSubmit={onSubmit}>
          <Form.Field name="name" label="Name">
            {({ id, value, onChange }) => (
              <input
                id={id}
                type="text"
                value={(value as string) || ''}
                onChange={(e) => onChange(e.target.value)}
                data-testid="name-input"
              />
            )}
          </Form.Field>
          <Form.Submit loadingText="Creating...">Create</Form.Submit>
        </Form>
      );

      const nameInput = screen.getByTestId('name-input');
      const submitButton = screen.getByRole('button', { name: 'Create' });

      fireEvent.change(nameInput, { target: { value: 'John' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(submitButton).toHaveTextContent('Creating...');
      });
    });
  });

  describe('Form reset functionality', () => {
    it('resets form to initial values', async () => {
      render(
        <Form initialValues={{ name: 'Initial' }} onSubmit={vi.fn()}>
          <Form.Field name="name" label="Name">
            {({ id, value, onChange }) => (
              <input
                id={id}
                type="text"
                value={(value as string) || ''}
                onChange={(e) => onChange(e.target.value)}
                data-testid="name-input"
              />
            )}
          </Form.Field>
          <Form.Reset>Reset</Form.Reset>
        </Form>
      );

      const nameInput = screen.getByTestId('name-input');
      const resetButton = screen.getByRole('button', { name: 'Reset' });

      // Change the value
      fireEvent.change(nameInput, { target: { value: 'Changed' } });
      expect(nameInput).toHaveValue('Changed');

      // Reset the form
      fireEvent.click(resetButton);

      await waitFor(() => {
        expect(nameInput).toHaveValue('Initial');
      });
    });
  });

  describe('Layout variants', () => {
    it('applies layout classes correctly', () => {
      const { container } = render(
        <Form layout="horizontal" spacing="relaxed" onSubmit={vi.fn()}>
          <Form.Field name="name" label="Name">
            {({ id, value, onChange }) => (
              <input
                id={id}
                type="text"
                value={(value as string) || ''}
                onChange={(e) => onChange(e.target.value)}
              />
            )}
          </Form.Field>
        </Form>
      );

      const form = container.querySelector('form');
      // Check for CSS module classes (they will be hashed)
      expect(form?.className).toContain('form');
      expect(form?.className).toContain('layoutHorizontal');
      expect(form?.className).toContain('spacingRelaxed');
    });
  });

  describe('Error message component', () => {
    it('shows error message when field has error and is touched', async () => {
      render(
        <Form onSubmit={vi.fn()}>
          <Form.Field name="name" label="Name" required>
            {({ id, value, onChange }) => (
              <input
                id={id}
                type="text"
                value={(value as string) || ''}
                onChange={(e) => onChange(e.target.value)}
                data-testid="name-input"
              />
            )}
          </Form.Field>
        </Form>
      );

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
      });
    });

    it('does not show error message when field is not touched', () => {
      render(
        <Form onSubmit={vi.fn()}>
          <Form.Field name="name" label="Name" required>
            {({ id, value, onChange }) => (
              <input
                id={id}
                type="text"
                value={(value as string) || ''}
                onChange={(e) => onChange(e.target.value)}
                data-testid="name-input"
              />
            )}
          </Form.Field>
        </Form>
      );

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('associates labels with inputs correctly', () => {
      render(
        <Form onSubmit={vi.fn()}>
          <Form.Field name="name" label="Name" required>
            {({ id, value, onChange }) => (
              <input
                id={id}
                type="text"
                value={(value as string) || ''}
                onChange={(e) => onChange(e.target.value)}
                data-testid="name-input"
              />
            )}
          </Form.Field>
        </Form>
      );

      const label = screen.getByText('Name');
      const input = screen.getByTestId('name-input');

      expect(label).toHaveAttribute('for', input.id);
    });

    it('sets aria-invalid when field has error', async () => {
      render(
        <Form onSubmit={vi.fn()}>
          <Form.Field name="name" label="Name" required>
            {({ id, value, onChange, 'aria-invalid': ariaInvalid }) => (
              <input
                id={id}
                type="text"
                value={(value as string) || ''}
                onChange={(e) => onChange(e.target.value)}
                data-testid="name-input"
                aria-invalid={ariaInvalid}
              />
            )}
          </Form.Field>
        </Form>
      );

      const input = screen.getByTestId('name-input');
      const submitButton = screen.getByRole('button', { name: 'Submit' });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(input).toHaveAttribute('aria-invalid', 'true');
      });
    });

    it('sets aria-describedby for error messages', async () => {
      render(
        <Form onSubmit={vi.fn()}>
          <Form.Field name="name" label="Name" required>
            {({ id, value, onChange, 'aria-describedby': ariaDescribedBy }) => (
              <input
                id={id}
                type="text"
                value={(value as string) || ''}
                onChange={(e) => onChange(e.target.value)}
                data-testid="name-input"
                aria-describedby={ariaDescribedBy}
              />
            )}
          </Form.Field>
        </Form>
      );

      const input = screen.getByTestId('name-input');
      const submitButton = screen.getByRole('button', { name: 'Submit' });

      fireEvent.click(submitButton);

      await waitFor(() => {
        const ariaDescribedBy = input.getAttribute('aria-describedby');
        expect(ariaDescribedBy).toBeTruthy();

        if (ariaDescribedBy) {
          const errorElement = document.getElementById(ariaDescribedBy);
          expect(errorElement).toHaveTextContent('This field is required');
        }
      });
    });
  });
});
