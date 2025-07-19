import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '../../../../atomic/atoms/Checkbox/Checkbox';

export default {
  title: 'Atoms/Checkbox',
  component: Checkbox,
} as Meta<typeof Checkbox>;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Check me',
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'Already checked',
    checked: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    checked: false,
  },
};
