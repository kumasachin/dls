import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../../../atomic/atoms/Button/Button';
import { Header } from '../../../../atomic/organisms/Header/Header';

const meta: Meta<typeof Header> = {
  title: 'Organisms/Header',
  component: Header,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ margin: '-1rem', height: '100px' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  render: () => {
    return (
      <Header
        title="Company Name"
        logoUrl="https://via.placeholder.com/32"
        onLogoClick={() => alert('Logo clicked')}
      />
    );
  },
};

export const WithSearch: Story = {
  render: () => {
    return (
      <Header
        title="Company Name"
        logoUrl="https://via.placeholder.com/32"
        onSearch={(query) => alert(`Searching for: ${query}`)}
      />
    );
  },
};

export const WithUserInfo: Story = {
  render: () => {
    return (
      <Header
        title="Company Name"
        logoUrl="https://via.placeholder.com/32"
        onSearch={(query) => alert(`Searching for: ${query}`)}
        userName="John Doe"
        userImageUrl="https://via.placeholder.com/40"
        userSubtitle="Admin"
        onUserClick={() => alert('User profile clicked')}
      />
    );
  },
};

export const WithActions: Story = {
  render: () => {
    return (
      <Header
        title="Company Name"
        logoUrl="https://via.placeholder.com/32"
        actions={[
          <Button key="help" onClick={() => alert('Help clicked')} variant="secondary">
            Help
          </Button>,
          <Button key="signup" onClick={() => alert('Sign Up clicked')} variant="secondary">
            Sign Up
          </Button>,
          <Button key="signin" variant="primary" onClick={() => alert('Sign In clicked')}>
            Sign In
          </Button>,
        ]}
      />
    );
  },
};
