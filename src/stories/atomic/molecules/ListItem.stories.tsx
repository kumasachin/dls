import type { Meta, StoryObj } from '@storybook/react-vite';
import { ListItem } from '../../../atomic/molecules/ListItem/ListItem';

const meta: Meta<typeof ListItem> = {
  title: 'Molecules/ListItem',
  component: ListItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A flexible list item component that combines image, text content, tags, and rating.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Title text of the list item',
    },
    description: {
      control: 'text',
      description: 'Description text',
    },
    metadata: {
      control: 'text',
      description: 'Additional metadata text',
    },
    variant: {
      control: 'select',
      options: ['default', 'card', 'compact', 'detailed'],
      description: 'Visual style variant',
    },
    layout: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout direction',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the list item',
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the item is interactive',
    },
    selected: {
      control: 'boolean',
      description: 'Whether the item is selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the item is disabled',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'React Component Library',
    description:
      'A comprehensive design system built with React and TypeScript, featuring reusable components for modern web applications.',
    metadata: '2 hours ago',
  },
};

export const WithImage: Story = {
  args: {
    title: 'Product Design Course',
    description:
      'Learn the fundamentals of product design with this comprehensive course covering UX research, wireframing, and prototyping.',
    metadata: 'Updated yesterday',
    image: {
      src: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=400&h=400&fit=crop',
      alt: 'Product design course thumbnail',
    },
  },
};

export const WithTagsAndRating: Story = {
  args: {
    title: 'Advanced React Patterns',
    description:
      'Master advanced React patterns including compound components, render props, and custom hooks.',
    metadata: '4.5 hours',
    image: {
      src: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=400&fit=crop',
      alt: 'React course thumbnail',
    },
    tags: [
      { label: 'React', color: 'primary' },
      { label: 'TypeScript', color: 'success' },
      { label: 'Advanced', color: 'warning' },
    ],
    rating: {
      value: 4.5,
      max: 5,
      readOnly: true,
      showValue: true,
    },
  },
};

export const Variants: Story = {
  args: {
    title: 'Design System Workshop',
    description: 'Build scalable design systems from scratch using modern tools and methodologies.',
    image: {
      src: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=400&h=400&fit=crop',
      alt: 'Workshop thumbnail',
    },
    tags: [{ label: 'Design', color: 'primary' }],
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <div>
        <h4>Default</h4>
        <ListItem {...args} variant="default" />
      </div>
      <div>
        <h4>Card</h4>
        <ListItem {...args} variant="card" />
      </div>
      <div>
        <h4>Compact</h4>
        <ListItem {...args} variant="compact" />
      </div>
      <div>
        <h4>Detailed</h4>
        <ListItem {...args} variant="detailed" />
      </div>
    </div>
  ),
};

export const Layouts: Story = {
  args: {
    title: 'UI/UX Best Practices',
    description: 'Essential principles for creating intuitive and accessible user interfaces.',
    image: {
      src: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=400&h=400&fit=crop',
      alt: 'UI/UX thumbnail',
    },
    tags: [{ label: 'UI/UX', color: 'primary' }],
    rating: { value: 5, max: 5, readOnly: true },
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ maxWidth: '600px' }}>
        <h4>Horizontal Layout</h4>
        <ListItem {...args} layout="horizontal" />
      </div>
      <div style={{ maxWidth: '300px' }}>
        <h4>Vertical Layout</h4>
        <ListItem {...args} layout="vertical" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    title: 'Figma Fundamentals',
    description: 'Learn to use Figma for professional design work.',
    image: {
      src: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=400&h=400&fit=crop',
      alt: 'Figma course',
    },
    tags: [{ label: 'Figma', color: 'success' }],
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <div>
        <h4>Small</h4>
        <ListItem {...args} size="sm" />
      </div>
      <div>
        <h4>Medium</h4>
        <ListItem {...args} size="md" />
      </div>
      <div>
        <h4>Large</h4>
        <ListItem {...args} size="lg" />
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    title: 'Interactive Course',
    description: 'Click me to see interaction behavior!',
    image: {
      src: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=400&fit=crop',
      alt: 'Interactive course',
    },
    interactive: true,
    onItemClick: () => alert('Item clicked!'),
  },
};

export const States: Story = {
  args: {
    title: 'State Examples',
    description: 'Different states of the list item component.',
    image: {
      src: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=400&h=400&fit=crop',
      alt: 'State examples',
    },
    tags: [{ label: 'Example', color: 'primary' }],
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <div>
        <h4>Normal</h4>
        <ListItem {...args} />
      </div>
      <div>
        <h4>Selected</h4>
        <ListItem {...args} selected />
      </div>
      <div>
        <h4>Disabled</h4>
        <ListItem {...args} disabled />
      </div>
    </div>
  ),
};

export const WithActions: Story = {
  args: {
    title: 'Course with Actions',
    description: 'A course item with action buttons for additional functionality.',
    image: {
      src: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=400&fit=crop',
      alt: 'Course with actions',
    },
    tags: [
      { label: 'React', color: 'primary' },
      { label: 'Popular', color: 'success' },
    ],
    rating: { value: 4, max: 5, readOnly: true },
    actions: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <button type="button" style={{ padding: '4px 8px', fontSize: '12px' }}>
          Bookmark
        </button>
        <button type="button" style={{ padding: '4px 8px', fontSize: '12px' }}>
          Share
        </button>
      </div>
    ),
  },
};

export const CustomContent: Story = {
  args: {
    title: 'Will be overridden',
  },
  render: () => (
    <ListItem title="Custom">
      <div
        style={{ padding: '16px', textAlign: 'center', background: '#f0f0f0', borderRadius: '8px' }}
      >
        <h3>Custom Content</h3>
        <p>This completely replaces the default list item layout.</p>
        <button type="button">Custom Action</button>
      </div>
    </ListItem>
  ),
};
