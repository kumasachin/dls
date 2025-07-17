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
    src: 'https://randomuser.me/api/portraits/men/32.jpg',
    alt: 'User',
    size: 48,
  },
};

export const WithInitials: Story = {
  args: {
    initials: 'SK',
    size: 48,
  },
};
