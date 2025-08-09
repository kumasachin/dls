import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../atomic/atoms/Button/Button';
import { Card } from '../atomic/atoms/Card/Card';
import { Input } from '../atomic/atoms/Input/Input';
import { Text } from '../atomic/atoms/Text/Text';
import { ThemeProvider } from '../tokens/themes/ThemeProvider';
import { ThemeSwitcher } from '../tokens/themes/ThemeSwitcher';

const meta = {
  title: 'Design System/Theme Integration Demo',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Comprehensive demo showcasing all components integrated with the theme system. Switch themes to see how all components adapt.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ minHeight: '100vh', padding: '20px', background: 'var(--color-surface-1)' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputValue2, setInputValue2] = useState('');

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          padding: '20px',
          background: 'var(--color-surface-2)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
        }}
      >
        <div>
          <Text as="h1" size="2xl" weight="bold" color="primary">
            Design System Demo
          </Text>
          <Text size="lg" color="secondary">
            Switch themes to see all components adapt
          </Text>
        </div>
        <ThemeSwitcher />
      </div>

      {/* Component Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '32px',
        }}
      >
        {/* Buttons Card */}
        <Card elevation="raised" padding="spacious" radius="lg">
          <Text as="h2" size="xl" weight="semibold" style={{ marginBottom: '16px' }}>
            Buttons
          </Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Button variant="primary" size="sm">
                Primary SM
              </Button>
              <Button variant="primary" size="md">
                Primary MD
              </Button>
              <Button variant="primary" size="lg">
                Primary LG
              </Button>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Button variant="secondary" size="md">
                Secondary
              </Button>
              <Button variant="ghost" size="md">
                Ghost
              </Button>
              <Button variant="danger" size="md">
                Danger
              </Button>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Button variant="primary" size="md" loading>
                Loading
              </Button>
              <Button variant="secondary" size="md" disabled>
                Disabled
              </Button>
            </div>
          </div>
        </Card>

        {/* Inputs Card */}
        <Card elevation="raised" padding="spacious" radius="lg">
          <Text as="h2" size="xl" weight="semibold" style={{ marginBottom: '16px' }}>
            Inputs
          </Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Input
              size="sm"
              placeholder="Small input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Input
              size="md"
              placeholder="Medium input (default)"
              value={inputValue2}
              onChange={(e) => setInputValue2(e.target.value)}
            />
            <Input size="lg" placeholder="Large input" value="" onChange={() => {}} />
            <Input
              size="md"
              variant="error"
              placeholder="Error state"
              value=""
              onChange={() => {}}
            />
            <Input
              size="md"
              variant="ghost"
              placeholder="Ghost variant"
              value=""
              onChange={() => {}}
            />
          </div>
        </Card>

        {/* Cards Demo */}
        <Card elevation="raised" padding="spacious" radius="lg">
          <Text as="h2" size="xl" weight="semibold" style={{ marginBottom: '16px' }}>
            Card Variants
          </Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Card elevation="flat" padding="default" radius="sm" border="subtle">
              <Text>Flat elevation with subtle border</Text>
            </Card>
            <Card elevation="raised" padding="compact" radius="md">
              <Text>Raised elevation, compact padding</Text>
            </Card>
            <Card elevation="floating" padding="spacious" radius="lg" border="strong">
              <Text>Floating elevation with strong border</Text>
            </Card>
          </div>
        </Card>

        {/* Typography Card */}
        <Card elevation="raised" padding="spacious" radius="lg">
          <Text as="h2" size="xl" weight="semibold" style={{ marginBottom: '16px' }}>
            Typography
          </Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Text size="xs" color="secondary">
              Extra small text
            </Text>
            <Text size="sm" color="secondary">
              Small text
            </Text>
            <Text size="md">Base text</Text>
            <Text size="lg" weight="medium">
              Large medium text
            </Text>
            <Text size="xl" weight="semibold" color="primary">
              Extra large semibold
            </Text>
            <Text size="2xl" weight="bold" color="primary">
              2XL bold text
            </Text>
          </div>
        </Card>
      </div>

      {/* Interactive Demo Section */}
      <Card elevation="floating" padding="spacious" radius="lg">
        <Text as="h2" size="xl" weight="semibold" style={{ marginBottom: '16px' }}>
          Interactive Demo
        </Text>
        <Text size="md" color="secondary" style={{ marginBottom: '20px' }}>
          This section demonstrates components working together with theme system integration.
        </Text>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
          }}
        >
          <div>
            <Text size="sm" weight="medium" style={{ marginBottom: '8px' }}>
              User Information
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Input
                placeholder="Enter your name"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Input
                placeholder="Enter your email"
                value={inputValue2}
                onChange={(e) => setInputValue2(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Text size="sm" weight="medium" style={{ marginBottom: '8px' }}>
              Actions
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Button variant="primary" size="md">
                Save Changes
              </Button>
              <Button variant="secondary" size="md">
                Cancel
              </Button>
              <Button variant="ghost" size="md">
                Reset Form
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export const Complete: Story = {
  render: () => <DemoComponent />,
};
