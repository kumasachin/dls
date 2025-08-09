import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../../../../atomic/atoms/Card/Card';
import { Text } from '../../../../atomic/atoms/Text/Text';

const meta: Meta<typeof Card> = {
  title: 'Atoms/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Flexible card component with CVA variants for elevation, borders, padding, and radius.',
      },
    },
  },
  argTypes: {
    elevation: {
      control: 'select',
      options: ['flat', 'raised', 'floating'],
      description: 'Elevation level of the card',
    },
    border: {
      control: 'select',
      options: ['none', 'subtle', 'strong'],
      description: 'Border style of the card',
    },
    padding: {
      control: 'select',
      options: ['compact', 'default', 'spacious'],
      description: 'Internal padding of the card',
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Border radius of the card',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    elevation: 'raised',
    border: 'none',
    padding: 'default',
    radius: 'md',
  },
  render: (args) => (
    <Card {...args}>
      <Text size="lg" weight="semibold">
        Card Title
      </Text>
      <Text variant="secondary" style={{ marginTop: '8px' }}>
        This is a default card with raised elevation and medium border radius.
      </Text>
    </Card>
  ),
};

export const Elevations: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
      }}
    >
      <Card elevation="flat">
        <Text weight="medium">Flat Elevation</Text>
        <Text variant="muted" size="sm" style={{ marginTop: '8px' }}>
          No shadow, minimal visual hierarchy
        </Text>
      </Card>

      <Card elevation="raised">
        <Text weight="medium">Raised Elevation</Text>
        <Text variant="muted" size="sm" style={{ marginTop: '8px' }}>
          Subtle shadow for content separation
        </Text>
      </Card>

      <Card elevation="floating">
        <Text weight="medium">Floating Elevation</Text>
        <Text variant="muted" size="sm" style={{ marginTop: '8px' }}>
          Strong shadow for prominent content
        </Text>
      </Card>
    </div>
  ),
};

export const Borders: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
      }}
    >
      <Card border="none" elevation="flat">
        <Text weight="medium">No Border</Text>
        <Text variant="muted" size="sm" style={{ marginTop: '8px' }}>
          Clean appearance without border
        </Text>
      </Card>

      <Card border="subtle" elevation="flat">
        <Text weight="medium">Subtle Border</Text>
        <Text variant="muted" size="sm" style={{ marginTop: '8px' }}>
          Light border for definition
        </Text>
      </Card>

      <Card border="strong" elevation="flat">
        <Text weight="medium">Strong Border</Text>
        <Text variant="muted" size="sm" style={{ marginTop: '8px' }}>
          Prominent border for emphasis
        </Text>
      </Card>
    </div>
  ),
};

export const Padding: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
      }}
    >
      <Card padding="compact" border="subtle">
        <Text weight="medium">Compact Padding</Text>
        <Text variant="muted" size="sm" style={{ marginTop: '8px' }}>
          Minimal space for dense layouts
        </Text>
      </Card>

      <Card padding="default" border="subtle">
        <Text weight="medium">Default Padding</Text>
        <Text variant="muted" size="sm" style={{ marginTop: '8px' }}>
          Balanced space for most content
        </Text>
      </Card>

      <Card padding="spacious" border="subtle">
        <Text weight="medium">Spacious Padding</Text>
        <Text variant="muted" size="sm" style={{ marginTop: '8px' }}>
          Generous space for important content
        </Text>
      </Card>
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '24px',
      }}
    >
      <Card radius="none" border="subtle">
        <Text weight="medium">No Radius</Text>
        <Text variant="muted" size="sm" style={{ marginTop: '8px' }}>
          Sharp corners
        </Text>
      </Card>

      <Card radius="sm" border="subtle">
        <Text weight="medium">Small Radius</Text>
        <Text variant="muted" size="sm" style={{ marginTop: '8px' }}>
          Slightly rounded
        </Text>
      </Card>

      <Card radius="md" border="subtle">
        <Text weight="medium">Medium Radius</Text>
        <Text variant="muted" size="sm" style={{ marginTop: '8px' }}>
          Moderately rounded
        </Text>
      </Card>

      <Card radius="lg" border="subtle">
        <Text weight="medium">Large Radius</Text>
        <Text variant="muted" size="sm" style={{ marginTop: '8px' }}>
          Heavily rounded
        </Text>
      </Card>
    </div>
  ),
};

export const ComplexLayouts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <Card elevation="floating" padding="spacious" radius="lg">
        <Text size="xl" weight="bold">
          Featured Article
        </Text>
        <Text variant="muted" size="sm" style={{ marginTop: '8px', marginBottom: '16px' }}>
          Published on August 8, 2025
        </Text>
        <Text style={{ marginBottom: '16px' }}>
          This is a featured article card with floating elevation, spacious padding, and large
          border radius to create a premium appearance.
        </Text>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Card elevation="flat" padding="compact" radius="sm" border="subtle">
            <Text size="sm" variant="accent">
              React
            </Text>
          </Card>
          <Card elevation="flat" padding="compact" radius="sm" border="subtle">
            <Text size="sm" variant="accent">
              TypeScript
            </Text>
          </Card>
          <Card elevation="flat" padding="compact" radius="sm" border="subtle">
            <Text size="sm" variant="accent">
              Design Systems
            </Text>
          </Card>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Card elevation="raised" padding="default">
          <Text weight="semibold">Quick Stats</Text>
          <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text variant="muted" size="sm">
                Users
              </Text>
              <Text weight="medium">1,234</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text variant="muted" size="sm">
                Revenue
              </Text>
              <Text weight="medium" variant="success">
                $12,345
              </Text>
            </div>
          </div>
        </Card>

        <Card elevation="raised" padding="default">
          <Text weight="semibold">Recent Activity</Text>
          <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Text size="sm">New user registered</Text>
            <Text size="sm">Payment processed</Text>
            <Text size="sm">Report generated</Text>
          </div>
        </Card>
      </div>
    </div>
  ),
};
