import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from '../../../../atomic/molecules/Pagination/Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Atomic/Molecules/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: 'number',
      description: 'Current active page number',
    },
    totalPages: {
      control: 'number',
      description: 'Total number of pages',
    },
    showFirstLast: {
      control: 'boolean',
      description: 'Show first and last page buttons',
    },
    showPrevNext: {
      control: 'boolean',
      description: 'Show previous and next buttons',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    onPageChange: (page: number) => console.log(`Navigate to page ${page}`),
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 15,
    totalPages: 50,
    onPageChange: (page: number) => console.log(`Navigate to page ${page}`),
  },
};

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 5,
    onPageChange: (page: number) => console.log(`Navigate to page ${page}`),
  },
};

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 20,
    onPageChange: (page: number) => console.log(`Navigate to page ${page}`),
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 20,
    totalPages: 20,
    onPageChange: (page: number) => console.log(`Navigate to page ${page}`),
  },
};

export const WithoutFirstLast: Story = {
  args: {
    currentPage: 5,
    totalPages: 15,
    showFirstLast: false,
    onPageChange: (page: number) => console.log(`Navigate to page ${page}`),
  },
};

export const WithoutPrevNext: Story = {
  args: {
    currentPage: 8,
    totalPages: 20,
    showPrevNext: false,
    onPageChange: (page: number) => console.log(`Navigate to page ${page}`),
  },
};

export const MinimalControls: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    showFirstLast: false,
    showPrevNext: false,
    onPageChange: (page: number) => console.log(`Navigate to page ${page}`),
  },
};
