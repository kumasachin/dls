import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { AlertBox } from '../../../../atomic/molecules/AlertBox/AlertBox';

const meta: Meta<typeof AlertBox> = {
  title: 'Molecules/AlertBox',
  component: AlertBox,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AlertBox>;

export const Info: Story = {
  args: {
    type: 'info',
    message: 'This is an information message',
  },
};

export const Success: Story = {
  args: {
    type: 'success',
    message: 'Operation completed successfully!',
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    message: 'Warning: This action cannot be undone',
  },
};

export const ErrorAlert: Story = {
  args: {
    type: 'error',
    message: 'An error occurred while processing your request',
  },
};

export const Dismissible: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);

    if (!visible) {
      return (
        <button type="button" onClick={() => setVisible(true)}>
          Show Alert Again
        </button>
      );
    }

    return (
      <AlertBox
        type="info"
        message="Click the X to dismiss this alert"
        onClose={() => setVisible(false)}
      />
    );
  },
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <AlertBox type="info" message="Information message" />
      <AlertBox type="success" message="Success message" />
      <AlertBox type="warning" message="Warning message" />
      <AlertBox type="error" message="Error message" />
    </div>
  ),
};
