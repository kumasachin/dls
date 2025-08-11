import type { Meta, StoryObj } from '@storybook/react-vite';
import { Image } from '../../../atomic/atoms/Image/Image';

const meta: Meta<typeof Image> = {
  title: 'Atoms/Image',
  component: Image,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible image component with fallback support, loading states, and multiple variants.',
      },
    },
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'Source URL of the image',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the image',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the image',
    },
    variant: {
      control: 'select',
      options: ['default', 'rounded', 'circle', 'thumbnail'],
      description: 'Visual style variant',
    },
    objectFit: {
      control: 'select',
      options: ['cover', 'contain', 'fill', 'none'],
      description: 'How the image should be fitted',
    },
    fallbackSrc: {
      control: 'text',
      description: 'Fallback image URL if main src fails',
    },
    responsive: {
      control: 'boolean',
      description: 'Whether the image should be responsive',
    },
    aspectRatio: {
      control: 'text',
      description: 'Custom aspect ratio (e.g., "16/9")',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    alt: 'Profile picture',
    size: 'md',
    variant: 'default',
  },
};

export const Sizes: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    alt: 'Profile picture',
  },
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Image {...args} size="xs" />
      <Image {...args} size="sm" />
      <Image {...args} size="md" />
      <Image {...args} size="lg" />
      <Image {...args} size="xl" />
    </div>
  ),
};

export const Variants: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    alt: 'Profile picture',
    size: 'lg',
  },
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Image {...args} variant="default" />
      <Image {...args} variant="rounded" />
      <Image {...args} variant="circle" />
      <Image {...args} variant="thumbnail" />
    </div>
  ),
};

export const ObjectFit: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400',
    alt: 'Landscape',
    size: 'lg',
    aspectRatio: '16/9',
  },
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
      <div>
        <h4>Cover (default)</h4>
        <Image {...args} objectFit="cover" />
      </div>
      <div>
        <h4>Contain</h4>
        <Image {...args} objectFit="contain" />
      </div>
      <div>
        <h4>Fill</h4>
        <Image {...args} objectFit="fill" />
      </div>
      <div>
        <h4>None</h4>
        <Image {...args} objectFit="none" />
      </div>
    </div>
  ),
};

export const WithFallback: Story = {
  args: {
    src: 'https://invalid-url.jpg',
    fallbackSrc:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    alt: 'Profile with fallback',
    size: 'lg',
  },
};

export const ErrorState: Story = {
  args: {
    src: 'https://invalid-url.jpg',
    alt: 'Broken image',
    size: 'lg',
  },
};

export const CustomAspectRatio: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400',
    alt: 'Custom aspect ratio',
    aspectRatio: '21/9',
    responsive: true,
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Image {...args} />
    </div>
  ),
};

export const Responsive: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400',
    alt: 'Responsive image',
    responsive: true,
  },
  render: (args) => (
    <div style={{ width: '100%', maxWidth: '400px', border: '1px dashed #ccc', padding: '16px' }}>
      <p>Resize this container to see responsive behavior:</p>
      <Image {...args} />
    </div>
  ),
};
