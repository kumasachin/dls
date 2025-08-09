import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../../../../atomic/atoms/Text/Text';

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Flexible text component with CVA variants for size, weight, color, and alignment. Supports semantic HTML elements.',
      },
    },
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'label'],
      description: 'HTML element to render',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Text size',
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'accent', 'error', 'success', 'warning'],
      description: 'Color variant',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    size: 'md',
    weight: 'normal',
    variant: 'primary',
    align: 'left',
    children: 'This is default text content',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text size="xs">Extra Small Text (12px)</Text>
      <Text size="sm">Small Text (14px)</Text>
      <Text size="md">Medium Text (16px) - Default</Text>
      <Text size="lg">Large Text (18px)</Text>
      <Text size="xl">Extra Large Text (20px)</Text>
      <Text size="2xl">2X Large Text (24px)</Text>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text weight="normal">Normal Weight (400)</Text>
      <Text weight="medium">Medium Weight (500)</Text>
      <Text weight="semibold">Semibold Weight (600)</Text>
      <Text weight="bold">Bold Weight (700)</Text>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text variant="primary">Primary text color</Text>
      <Text variant="secondary">Secondary text color</Text>
      <Text variant="muted">Muted text color</Text>
      <Text variant="accent">Accent text color</Text>
      <Text variant="error">Error text color</Text>
      <Text variant="success">Success text color</Text>
      <Text variant="warning">Warning text color</Text>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text align="left" style={{ border: '1px dashed #ccc', padding: '8px', width: '300px' }}>
        Left aligned text content
      </Text>
      <Text align="center" style={{ border: '1px dashed #ccc', padding: '8px', width: '300px' }}>
        Center aligned text content
      </Text>
      <Text align="right" style={{ border: '1px dashed #ccc', padding: '8px', width: '300px' }}>
        Right aligned text content
      </Text>
      <Text align="justify" style={{ border: '1px dashed #ccc', padding: '8px', width: '300px' }}>
        Justified text content that spreads across the full width of the container to create even
        spacing.
      </Text>
    </div>
  ),
};

export const SemanticElements: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text as="h1" size="2xl" weight="bold">
        Heading 1 Element
      </Text>
      <Text as="h2" size="xl" weight="semibold">
        Heading 2 Element
      </Text>
      <Text as="h3" size="lg" weight="medium">
        Heading 3 Element
      </Text>
      <Text as="p" size="md">
        Paragraph element with default styling
      </Text>
      <Text as="span" size="sm" variant="muted">
        Span element for inline text
      </Text>
      <Text as="label" size="sm" weight="medium">
        Label element for forms
      </Text>
    </div>
  ),
};

export const Combinations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <div>
        <Text as="h2" size="xl" weight="bold" variant="primary">
          Article Title
        </Text>
        <Text size="sm" variant="muted" style={{ marginTop: '4px' }}>
          Published on August 8, 2025 by Design System Team
        </Text>
      </div>

      <div>
        <Text as="p" size="md" style={{ marginBottom: '16px' }}>
          This is a paragraph with{' '}
          <Text as="span" weight="semibold" variant="accent">
            highlighted text
          </Text>{' '}
          and some{' '}
          <Text as="span" variant="error">
            error text
          </Text>{' '}
          to show inline combinations.
        </Text>

        <Text as="p" size="md" variant="secondary">
          Secondary paragraph content with different color variant to show hierarchy.
        </Text>
      </div>

      <div style={{ border: '1px solid #e0e0e0', padding: '16px', borderRadius: '8px' }}>
        <Text as="h3" size="lg" weight="semibold" style={{ marginBottom: '12px' }}>
          Status Messages
        </Text>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Text variant="success" size="sm">
            ✓ Operation completed successfully
          </Text>
          <Text variant="warning" size="sm">
            ⚠ Warning: Check your input
          </Text>
          <Text variant="error" size="sm">
            ✗ Error: Something went wrong
          </Text>
        </div>
      </div>
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <div>
        <Text as="h1" size="2xl" weight="bold" style={{ marginBottom: '8px' }}>
          Typography Scale
        </Text>
        <Text variant="muted">
          Demonstrating the complete typography system with consistent spacing and hierarchy.
        </Text>
      </div>

      <div>
        <Text as="h2" size="xl" weight="semibold" style={{ marginBottom: '16px' }}>
          Large Heading (H2)
        </Text>
        <Text as="p" style={{ marginBottom: '16px' }}>
          This is body text that follows the large heading. It uses the default medium size and
          provides good readability for longer content blocks.
        </Text>

        <Text as="h3" size="lg" weight="medium" style={{ marginBottom: '12px' }}>
          Medium Heading (H3)
        </Text>
        <Text as="p" style={{ marginBottom: '12px' }}>
          Smaller heading with accompanying body text. Perfect for sub-sections and content
          organization within larger articles or documentation.
        </Text>

        <Text size="sm" variant="muted">
          Small text for captions, footnotes, or supplementary information that supports the main
          content without competing for attention.
        </Text>
      </div>
    </div>
  ),
};
