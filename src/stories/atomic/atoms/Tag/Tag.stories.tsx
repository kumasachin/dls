import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Tag } from '../../../../atomic/atoms/Tag/Tag';

const meta: Meta<typeof Tag> = {
  title: 'Atoms/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    label: 'Default Tag',
  },
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <Tag label="Default" color="default" />
      <Tag label="Primary" color="primary" />
      <Tag label="Success" color="success" />
      <Tag label="Warning" color="warning" />
      <Tag label="Error" color="error" />
      <Tag label="Info" color="info" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
      <Tag label="Small" size="small" />
      <Tag label="Medium" size="medium" />
      <Tag label="Large" size="large" />
    </div>
  ),
};

export const Removable: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);

    if (!visible) {
      return (
        <button type="button" onClick={() => setVisible(true)}>
          Show Tag Again
        </button>
      );
    }

    return <Tag label="Click × to remove" onRemove={() => setVisible(false)} color="primary" />;
  },
};
