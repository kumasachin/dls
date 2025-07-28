import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumb } from '../../../../atomic/molecules/Breadcrumb/Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Atomic/Molecules/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    separator: {
      control: 'text',
      description: 'Custom separator between breadcrumb items',
    },
    maxItems: {
      control: 'number',
      description: 'Maximum number of items to display before truncation',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Category', href: '/category' },
      { label: 'Subcategory', href: '/category/subcategory' },
      { label: 'Current Page' },
    ],
  },
};

export const WithCustomSeparator: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Smartphones' },
    ],
    separator: '>',
  },
};

export const WithClickHandlers: Story = {
  args: {
    items: [
      {
        label: 'Dashboard',
        onClick: () => console.log('Navigate to Dashboard'),
      },
      {
        label: 'Users',
        onClick: () => console.log('Navigate to Users'),
      },
      {
        label: 'Profile',
        onClick: () => console.log('Navigate to Profile'),
      },
      { label: 'Edit Profile' },
    ],
  },
};

export const Truncated: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Level 1', href: '/level1' },
      { label: 'Level 2', href: '/level1/level2' },
      { label: 'Level 3', href: '/level1/level2/level3' },
      { label: 'Level 4', href: '/level1/level2/level3/level4' },
      { label: 'Current Page' },
    ],
    maxItems: 4,
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Home' }],
  },
};
