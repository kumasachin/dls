import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from "../../../../atomic/atoms/Card/Card";

const meta: Meta<typeof Card> = {
  title: "Atoms/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: <div style={{ padding: '20px' }}>Card Content</div>,
  },
};

export const WithShadow: Story = {
  args: {
    children: <div style={{ padding: '20px' }}>Card with shadow</div>,
    shadow: 'lg',
  },
};

export const WithRadius: Story = {
  args: {
    children: <div style={{ padding: '20px' }}>Card with rounded corners</div>,
    radius: 'lg',
  },
};

export const Bordered: Story = {
  args: {
    children: <div style={{ padding: '20px' }}>Card with border</div>,
    bordered: true,
    shadow: 'none',
  },
};

export const CustomPadding: Story = {
  args: {
    children: <div>Card with custom padding</div>,
    padding: '32px',
  },
};
