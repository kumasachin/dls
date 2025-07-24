import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from '../../../../atomic/organisms/Header/Header';
import { Button } from '../../../../atomic/atoms/Button/Button';

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
          <Button
            key="help"
            label="Help"
            onClick={() => alert('Help clicked')}
            primary={false}
            backgroundColor="#f5f5f5"
          />,
          <Button
            key="signup"
            label="Sign Up"
            onClick={() => alert('Sign Up clicked')}
            primary={false}
          />,
          <Button key="signin" primary label="Sign In" onClick={() => alert('Sign In clicked')} />,
        ]}
      />
    );
  },
};
