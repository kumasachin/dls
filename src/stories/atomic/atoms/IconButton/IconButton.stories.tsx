import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from '../../../../atomic/atoms/IconButton/IconButton';

const HeartIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="currentColor"
    role="img"
    aria-label="Heart icon"
  >
    <title>Heart</title>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export default {
  title: 'Atoms/IconButton',
  component: IconButton,
} as Meta<typeof IconButton>;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    icon: <HeartIcon />,
  },
};

export const Primary: Story = {
  args: {
    icon: <HeartIcon />,
    variant: 'primary',
  },
};

export const Ghost: Story = {
  args: {
    icon: <HeartIcon />,
    variant: 'ghost',
  },
};

export const Small: Story = {
  args: {
    icon: <HeartIcon />,
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    icon: <HeartIcon />,
    size: 'large',
  },
};
