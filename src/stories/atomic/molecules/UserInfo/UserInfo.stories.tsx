import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserInfo } from "../../../../atomic/molecules/UserInfo/UserInfo";

const meta: Meta<typeof UserInfo> = {
  title: "Molecules/UserInfo",
  component: UserInfo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof UserInfo>;

export const Default: Story = {
  args: {
    name: 'Jane Doe',
    imageUrl: 'https://i.pravatar.cc/300?img=1',
  },
};

export const WithSubtitle: Story = {
  args: {
    name: 'John Smith',
    imageUrl: 'https://i.pravatar.cc/300?img=2',
    subtitle: 'Product Manager',
  },
};

export const Small: Story = {
  args: {
    name: 'Alice Johnson',
    imageUrl: 'https://i.pravatar.cc/300?img=3',
    subtitle: 'UI Designer',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    name: 'Robert Wilson',
    imageUrl: 'https://i.pravatar.cc/300?img=4',
    subtitle: 'Software Engineer',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    name: 'Emma Thompson',
    imageUrl: 'https://i.pravatar.cc/300?img=5',
    subtitle: 'Marketing Director',
    size: 'lg',
  },
};

export const NoImage: Story = {
  args: {
    name: 'David Brown',
    subtitle: 'Customer Support',
  },
};
