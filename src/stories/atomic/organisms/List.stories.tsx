import type { Meta, StoryObj } from '@storybook/react-vite';
import { List } from '../../../atomic/organisms/List/List';

const meta: Meta<typeof List> = {
  title: 'Organisms/List',
  component: List,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A powerful list organism that manages multiple list items with selection, keyboard navigation, and various layout options.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'divided', 'bordered', 'cards'],
      description: 'Visual style variant',
    },
    layout: {
      control: 'select',
      options: ['stack', 'grid'],
      description: 'Layout arrangement',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of list items',
    },
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Spacing between items',
    },
    selectable: {
      control: 'boolean',
      description: 'Whether items can be selected',
    },
    multiSelect: {
      control: 'boolean',
      description: 'Whether multiple items can be selected',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the list is in loading state',
    },
    showEmpty: {
      control: 'boolean',
      description: 'Whether to show empty state when no items',
    },
    keyboardNavigation: {
      control: 'boolean',
      description: 'Whether to enable keyboard navigation',
    },
    gridColumns: {
      control: 'number',
      description: 'Number of columns for grid layout',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    description:
      'Master advanced React patterns including compound components, render props, and custom hooks for building scalable applications.',
    metadata: '4.5 hours',
    image: {
      src: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=400&fit=crop',
      alt: 'React course thumbnail',
    },
    tags: [
      { label: 'React', color: 'primary' as const },
      { label: 'Advanced', color: 'warning' as const },
    ],
    rating: { value: 4.8, max: 5 as const, readOnly: true, showValue: true },
  },
  {
    id: '2',
    title: 'TypeScript Fundamentals',
    description:
      'Learn TypeScript from the ground up with practical examples and real-world applications.',
    metadata: '3 hours',
    image: {
      src: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&h=400&fit=crop',
      alt: 'TypeScript course thumbnail',
    },
    tags: [
      { label: 'TypeScript', color: 'success' as const },
      { label: 'Beginner', color: 'info' as const },
    ],
    rating: { value: 4.6, max: 5 as const, readOnly: true, showValue: true },
  },
  {
    id: '3',
    title: 'Design System Workshop',
    description: 'Build scalable design systems from scratch using modern tools and methodologies.',
    metadata: '6 hours',
    image: {
      src: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=400&h=400&fit=crop',
      alt: 'Design system workshop thumbnail',
    },
    tags: [
      { label: 'Design', color: 'primary' as const },
      { label: 'System', color: 'success' as const },
    ],
    rating: { value: 4.9, max: 5 as const, readOnly: true, showValue: true },
  },
  {
    id: '4',
    title: 'Node.js Backend Development',
    description: 'Complete guide to building REST APIs and microservices with Node.js and Express.',
    metadata: '8 hours',
    image: {
      src: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=400&fit=crop',
      alt: 'Node.js course thumbnail',
    },
    tags: [
      { label: 'Node.js', color: 'success' as const },
      { label: 'Backend', color: 'warning' as const },
    ],
    rating: { value: 4.4, max: 5 as const, readOnly: true, showValue: true },
  },
];

export const Default: Story = {
  args: {
    items: sampleItems.slice(0, 3),
  },
};

export const Variants: Story = {
  args: {
    items: sampleItems.slice(0, 3),
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4>Default</h4>
        <List {...args} variant="default" />
      </div>
      <div>
        <h4>Divided</h4>
        <List {...args} variant="divided" />
      </div>
      <div>
        <h4>Bordered</h4>
        <List {...args} variant="bordered" />
      </div>
      <div>
        <h4>Cards</h4>
        <List {...args} variant="cards" />
      </div>
    </div>
  ),
};

export const GridLayout: Story = {
  args: {
    items: sampleItems,
    layout: 'grid',
    gridColumns: 2,
    variant: 'cards',
  },
};

export const GridResponsive: Story = {
  args: {
    items: sampleItems,
    layout: 'grid',
    gridColumns: 3,
    variant: 'cards',
  },
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};

export const Selectable: Story = {
  args: {
    items: sampleItems,
    selectable: true,
    variant: 'bordered',
    onSelectionChange: (selectedIds) => {
      console.log('Selected items:', selectedIds);
    },
  },
};

export const MultiSelect: Story = {
  args: {
    items: sampleItems,
    selectable: true,
    multiSelect: true,
    variant: 'cards',
    defaultSelectedIds: ['1', '3'],
    onSelectionChange: (selectedIds) => {
      console.log('Selected items:', selectedIds);
    },
  },
};

export const Sizes: Story = {
  args: {
    items: sampleItems.slice(0, 2),
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4>Small</h4>
        <List {...args} size="sm" variant="bordered" />
      </div>
      <div>
        <h4>Medium</h4>
        <List {...args} size="md" variant="bordered" />
      </div>
      <div>
        <h4>Large</h4>
        <List {...args} size="lg" variant="bordered" />
      </div>
    </div>
  ),
};

export const Spacing: Story = {
  args: {
    items: sampleItems.slice(0, 3),
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4>No Spacing</h4>
        <List {...args} spacing="none" variant="divided" />
      </div>
      <div>
        <h4>Small Spacing</h4>
        <List {...args} spacing="sm" variant="cards" />
      </div>
      <div>
        <h4>Medium Spacing</h4>
        <List {...args} spacing="md" variant="cards" />
      </div>
      <div>
        <h4>Large Spacing</h4>
        <List {...args} spacing="lg" variant="cards" />
      </div>
    </div>
  ),
};

export const LoadingState: Story = {
  args: {
    items: [],
    loading: true,
  },
};

export const CustomLoadingState: Story = {
  args: {
    items: [],
    loading: true,
    loadingComponent: (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ fontSize: '24px', marginBottom: '16px' }}>🔄</div>
        <p>Loading awesome content...</p>
      </div>
    ),
  },
};

export const EmptyState: Story = {
  args: {
    items: [],
  },
};

export const CustomEmptyState: Story = {
  args: {
    items: [],
    emptyComponent: (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📚</div>
        <h3>No courses found</h3>
        <p>Try adjusting your search filters or check back later for new content.</p>
        <button type="button" style={{ marginTop: '16px', padding: '8px 16px' }}>
          Browse All Courses
        </button>
      </div>
    ),
  },
};

export const InteractiveList: Story = {
  args: {
    items: sampleItems,
    selectable: true,
    keyboardNavigation: true,
    variant: 'bordered',
    onItemClick: (item, index) => {
      console.log(`Clicked on item: ${item.title} at index ${index}`);
    },
    onSelectionChange: (selectedIds) => {
      console.log('Selection changed:', selectedIds);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use arrow keys to navigate, Enter/Space to select. Check the console for interaction logs.',
      },
    },
  },
};

export const CustomRender: Story = {
  args: {
    items: sampleItems.slice(0, 2),
    renderItem: (item, index, _defaultProps) => (
      <div
        style={{
          padding: '16px',
          border: '2px dashed #007bff',
          borderRadius: '8px',
          background: index % 2 === 0 ? '#f8f9fa' : '#ffffff',
        }}
      >
        <h3 style={{ margin: '0 0 8px 0', color: '#007bff' }}>
          #{index + 1}: {item.title}
        </h3>
        <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>{item.description}</p>
        {item.rating && (
          <div style={{ marginTop: '8px', fontSize: '12px' }}>
            Rating: {item.rating.value}/{item.rating.max} ⭐
          </div>
        )}
      </div>
    ),
  },
};
