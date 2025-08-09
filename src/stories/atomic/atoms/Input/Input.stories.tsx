import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Input } from '../../../../atomic/atoms/Input/Input';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Flexible input component with CVA variants for size, appearance, and state management.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input',
    },
    variant: {
      control: 'select',
      options: ['default', 'error', 'ghost'],
      description: 'Visual variant of the input',
    },
    state: {
      control: 'select',
      options: ['default', 'disabled', 'readonly'],
      description: 'State of the input',
    },
    error: {
      control: 'boolean',
      description: 'Whether the input has an error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the input is read-only',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    size: 'md',
    variant: 'default',
    placeholder: 'Enter text...',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};

export const Sizes: Story = {
  render: () => {
    const [values, setValues] = useState({ sm: '', md: '', lg: '' });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
        <div>
          <label
            htmlFor="input-sm"
            style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}
          >
            Small (sm)
          </label>
          <Input
            id="input-sm"
            size="sm"
            value={values.sm}
            onChange={(e) => setValues({ ...values, sm: e.target.value })}
            placeholder="Small input"
          />
        </div>
        <div>
          <label
            htmlFor="input-md"
            style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}
          >
            Medium (md) - Default
          </label>
          <Input
            id="input-md"
            size="md"
            value={values.md}
            onChange={(e) => setValues({ ...values, md: e.target.value })}
            placeholder="Medium input"
          />
        </div>
        <div>
          <label
            htmlFor="input-lg"
            style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}
          >
            Large (lg)
          </label>
          <Input
            id="input-lg"
            size="lg"
            value={values.lg}
            onChange={(e) => setValues({ ...values, lg: e.target.value })}
            placeholder="Large input"
          />
        </div>
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [values, setValues] = useState({ default: '', error: '', ghost: '' });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
        <div>
          <label
            htmlFor="input-default"
            style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}
          >
            Default Variant
          </label>
          <Input
            id="input-default"
            variant="default"
            value={values.default}
            onChange={(e) => setValues({ ...values, default: e.target.value })}
            placeholder="Default input"
          />
        </div>
        <div>
          <label
            htmlFor="error-variant"
            style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}
          >
            Error Variant
          </label>
          <Input
            id="error-variant"
            variant="error"
            value={values.error}
            onChange={(e) => setValues({ ...values, error: e.target.value })}
            placeholder="Error input"
          />
        </div>
        <div>
          <label
            htmlFor="input-ghost"
            style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}
          >
            Ghost Variant
          </label>
          <Input
            id="input-ghost"
            variant="ghost"
            value={values.ghost}
            onChange={(e) => setValues({ ...values, ghost: e.target.value })}
            placeholder="Ghost input"
          />
        </div>
      </div>
    );
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <div>
        <label
          htmlFor="normal-state"
          style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}
        >
          Normal State
        </label>
        <Input id="normal-state" value="" onChange={() => {}} placeholder="Normal input" />
      </div>
      <div>
        <label
          htmlFor="disabled-state"
          style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}
        >
          Disabled State
        </label>
        <Input id="disabled-state" value="Disabled input" onChange={() => {}} disabled />
      </div>
      <div>
        <label
          htmlFor="readonly-state"
          style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}
        >
          Read-only State
        </label>
        <Input id="readonly-state" value="Read-only input" onChange={() => {}} readOnly />
      </div>
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => {
    const [value, setValue] = useState('invalid@');

    return (
      <div style={{ maxWidth: '400px' }}>
        <label
          htmlFor="email-error"
          style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}
        >
          Email with Error
        </label>
        <Input
          id="email-error"
          type="email"
          error={true}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="your@email.com"
        />
        <p style={{ color: 'var(--color-error)', fontSize: '12px', marginTop: '4px' }}>
          Please enter a valid email address
        </p>
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    type FormErrors = {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    };

    const [errors, setErrors] = useState<FormErrors>({});

    const validate = () => {
      const newErrors: FormErrors = {};

      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }

      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }

      if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    return (
      <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ marginTop: 0, marginBottom: '16px' }}>Registration Form</h3>

        <div>
          <label
            htmlFor="full-name"
            style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}
          >
            Full Name
          </label>
          <Input
            id="full-name"
            size="md"
            error={!!errors.name}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p style={{ color: 'var(--color-error)', fontSize: '12px', marginTop: '4px' }}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email-address"
            style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}
          >
            Email Address
          </label>
          <Input
            id="email-address"
            type="email"
            size="md"
            error={!!errors.email}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p style={{ color: 'var(--color-error)', fontSize: '12px', marginTop: '4px' }}>
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}
          >
            Password
          </label>
          <Input
            id="password"
            type="password"
            size="md"
            error={!!errors.password}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Enter password"
          />
          {errors.password && (
            <p style={{ color: 'var(--color-error)', fontSize: '12px', marginTop: '4px' }}>
              {errors.password}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}
          >
            Confirm Password
          </label>
          <Input
            id="confirm-password"
            type="password"
            size="md"
            error={!!errors.confirmPassword}
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            placeholder="Confirm password"
          />
          {errors.confirmPassword && (
            <p style={{ color: 'var(--color-error)', fontSize: '12px', marginTop: '4px' }}>
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={validate}
          style={{
            padding: '8px 16px',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          Validate Form
        </button>
      </div>
    );
  },
};
