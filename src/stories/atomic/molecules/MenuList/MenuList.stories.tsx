import type { Meta, StoryObj } from '@storybook/react-vite';
import { MenuList } from '../../../../atomic/molecules/MenuList/MenuList';

const meta: Meta<typeof MenuList> = {
  title: 'Molecules/MenuList',
  component: MenuList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MenuList>;

const defaultItems = [
  { id: '1', label: 'Profile', onClick: () => alert('Profile clicked') },
  { id: '2', label: 'Settings', onClick: () => alert('Settings clicked') },
  { id: '3', label: 'Help', onClick: () => alert('Help clicked') },
  { id: '4', label: 'Logout', onClick: () => alert('Logout clicked') },
];

export const Default: Story = {
  args: {
    items: defaultItems,
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { id: '1', label: 'Profile', icon: '👤', onClick: () => alert('Profile clicked') },
      { id: '2', label: 'Settings', icon: '⚙️', onClick: () => alert('Settings clicked') },
      { id: '3', label: 'Help', icon: '❓', onClick: () => alert('Help clicked') },
      { id: '4', label: 'Logout', icon: '🚪', onClick: () => alert('Logout clicked') },
    ],
  },
};

export const WithDisabledItems: Story = {
  args: {
    items: [
      { id: '1', label: 'Profile', onClick: () => alert('Profile clicked') },
      { id: '2', label: 'Settings', onClick: () => alert('Settings clicked') },
      {
        id: '3',
        label: 'Premium Features',
        disabled: true,
        onClick: () => alert('Premium clicked'),
      },
      { id: '4', label: 'Help', onClick: () => alert('Help clicked') },
      { id: '5', label: 'Logout', onClick: () => alert('Logout clicked') },
    ],
  },
};

export const CustomWidth: Story = {
  args: {
    items: defaultItems,
    width: '300px',
  },
};

export const CustomHeight: Story = {
  args: {
    items: [
      ...defaultItems,
      { id: '5', label: 'Account', onClick: () => alert('Account clicked') },
      { id: '6', label: 'Billing', onClick: () => alert('Billing clicked') },
      { id: '7', label: 'Security', onClick: () => alert('Security clicked') },
      { id: '8', label: 'Notifications', onClick: () => alert('Notifications clicked') },
      { id: '9', label: 'API', onClick: () => alert('API clicked') },
    ],
    maxHeight: '200px',
  },
};
