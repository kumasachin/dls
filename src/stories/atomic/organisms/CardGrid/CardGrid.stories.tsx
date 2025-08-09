import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../../../atomic/atoms/Button/Button';
import { CardGrid, type CardGridItem } from '../../../../atomic/organisms/CardGrid/CardGrid';

const meta: Meta<typeof CardGrid> = {
  title: 'Organisms/CardGrid',
  component: CardGrid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 6],
      description: 'Number of columns in the grid',
    },
    gap: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Gap between grid items',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading skeleton',
    },
    emptyMessage: {
      control: 'text',
      description: 'Message shown when no items',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems: CardGridItem[] = [
  {
    id: 1,
    title: 'Product A',
    description: 'A great product with amazing features that will solve all your problems.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop',
    actions: <Button size="sm">View Details</Button>,
  },
  {
    id: 2,
    title: 'Product B',
    description: 'Another fantastic product that you definitely need in your life.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
    actions: <Button size="sm">Learn More</Button>,
  },
  {
    id: 3,
    title: 'Product C',
    description: 'The third product in our amazing lineup of incredible products.',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=200&fit=crop',
    actions: <Button size="sm">Buy Now</Button>,
  },
  {
    id: 4,
    title: 'Product D',
    description: 'Fourth product with excellent quality and great user reviews.',
    image: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=300&h=200&fit=crop',
    actions: <Button size="sm">Add to Cart</Button>,
  },
  {
    id: 5,
    title: 'Product E',
    description: 'Fifth product that completes our product collection perfectly.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop',
    actions: <Button size="sm">Explore</Button>,
  },
  {
    id: 6,
    title: 'Product F',
    description: 'The final product in our showcase with outstanding features.',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop',
    actions: <Button size="sm">Discover</Button>,
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    columns: 3,
    gap: 'medium',
  },
};

export const TwoColumns: Story = {
  args: {
    items: sampleItems,
    columns: 2,
    gap: 'medium',
  },
};

export const FourColumns: Story = {
  args: {
    items: sampleItems,
    columns: 4,
    gap: 'small',
  },
};

export const SingleColumn: Story = {
  args: {
    items: sampleItems.slice(0, 3),
    columns: 1,
    gap: 'large',
  },
};

export const WithoutImages: Story = {
  args: {
    items: sampleItems.map(({ image: _image, ...item }) => item),
    columns: 3,
    gap: 'medium',
  },
};

export const WithClickHandlers: Story = {
  args: {
    items: sampleItems.map((item) => ({
      ...item,
      onClick: () => console.log(`Clicked on ${item.title}`),
    })),
    columns: 3,
    gap: 'medium',
    onItemClick: (item) => console.log(`Grid click handler: ${item.title}`),
  },
};

export const WithLinks: Story = {
  args: {
    items: sampleItems.map((item) => ({
      ...item,
      href: `#${item.title.toLowerCase().replace(/\s+/g, '-')}`,
    })),
    columns: 3,
    gap: 'medium',
  },
};

export const Loading: Story = {
  args: {
    items: [],
    columns: 3,
    gap: 'medium',
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    items: [],
    columns: 3,
    gap: 'medium',
    emptyMessage: 'No products available at the moment.',
  },
};
