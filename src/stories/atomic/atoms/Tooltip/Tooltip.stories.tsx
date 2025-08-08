import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../../../atomic/atoms/Button/Button';
import { Tooltip } from '../../../../atomic/atoms/Tooltip/Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <Button>Hover me</Button>,
  },
};

export const Positions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', alignItems: 'center' }}>
      <Tooltip content="Tooltip on top" position="top">
        <Button>Top Tooltip</Button>
      </Tooltip>

      <div style={{ display: 'flex', gap: '50px' }}>
        <Tooltip content="Tooltip on left" position="left">
          <Button>Left Tooltip</Button>
        </Tooltip>

        <Tooltip content="Tooltip on right" position="right">
          <Button>Right Tooltip</Button>
        </Tooltip>
      </div>

      <Tooltip content="Tooltip on bottom" position="bottom">
        <Button>Bottom Tooltip</Button>
      </Tooltip>
    </div>
  ),
};

export const CustomDelay: Story = {
  args: {
    content: 'Tooltip with 1 second delay',
    children: <Button>Long hover</Button>,
    delay: 1000,
  },
};

export const LongContent: Story = {
  args: {
    content:
      'This is a tooltip with much longer content that demonstrates how tooltips handle more text',
    children: <Button>Hover for long tooltip</Button>,
  },
};
