import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from '../../../../atomic/atoms/Switch/Switch';

export default {
  title: 'Atoms/Switch',
  component: Switch,
} as Meta<typeof Switch>;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    checked: false,
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
  },
};
