import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../../../../atomic/atoms/Button/Button';
import { Input } from '../../../../atomic/atoms/Input/Input';
import { FormField } from '../../../../atomic/molecules/FormField/FormField';
import { Form } from '../../../../atomic/organisms/Form/Form';

const meta: Meta<typeof Form> = {
  title: 'Organisms/Form',
  component: Form,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
  render: () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    return (
      <Form
        title="Personal Information"
        onSubmit={(e) => {
          e.preventDefault();
          alert(`Submitted: ${firstName} ${lastName}`);
        }}
      >
        <FormField label="First Name" required>
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
          />
        </FormField>

        <FormField label="Last Name" required>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
          />
        </FormField>
      </Form>
    );
  },
};

export const WithCancel: Story = {
  render: () => {
    const [email, setEmail] = useState('');

    return (
      <Form
        title="Subscription"
        onSubmit={(e) => {
          e.preventDefault();
          alert(`Subscribed: ${email}`);
        }}
        onCancel={() => alert('Cancelled')}
      >
        <FormField label="Email" required>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </FormField>
      </Form>
    );
  },
};

export const Loading: Story = {
  render: () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
      <Form
        title="Sign In"
        isSubmitting={true}
        submitLabel="Sign In"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <FormField label="Username" required>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </FormField>

        <FormField label="Password" required>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </FormField>
      </Form>
    );
  },
};

export const WithCustomActions: Story = {
  render: () => {
    const [email, setEmail] = useState('');

    return (
      <Form
        title="Newsletter"
        submitLabel="Subscribe"
        onSubmit={(e) => {
          e.preventDefault();
          alert(`Subscribed: ${email}`);
        }}
        actions={[
          <Button onClick={() => setEmail('')} variant="secondary">
            Clear
          </Button>,
        ]}
      >
        <FormField label="Email" required>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </FormField>
      </Form>
    );
  },
};
