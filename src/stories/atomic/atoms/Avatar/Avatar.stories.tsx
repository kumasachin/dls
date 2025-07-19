import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from '../../../../atomic/atoms/Avatar/Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    alt: "User",
    size: 48,
  },
};

export const WithInitials: Story = {
  args: {
    initials: 'SK',
    size: 48,
  },
};
