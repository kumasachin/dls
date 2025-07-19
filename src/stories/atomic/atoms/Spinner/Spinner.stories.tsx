import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from '../../../../atomic/atoms/Spinner/Spinner';

export default {
  title: 'Atoms/Spinner',
  component: Spinner,
} as Meta<typeof Spinner>;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const CustomColor: Story = {
  args: {
    color: '#28a745',
  },
};
