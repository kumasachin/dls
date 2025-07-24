import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from '../../../../atomic/atoms/Tooltip/Tooltip';
import { Button } from '../../../../atomic/atoms/Button/Button';

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
    children: <Button label="Hover me" />,
  },
};

export const Positions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', alignItems: 'center' }}>
      <Tooltip content="Tooltip on top" position="top">
        <Button label="Top Tooltip" />
      </Tooltip>

      <div style={{ display: 'flex', gap: '50px' }}>
        <Tooltip content="Tooltip on left" position="left">
          <Button label="Left Tooltip" />
        </Tooltip>

        <Tooltip content="Tooltip on right" position="right">
          <Button label="Right Tooltip" />
        </Tooltip>
      </div>

      <Tooltip content="Tooltip on bottom" position="bottom">
        <Button label="Bottom Tooltip" />
      </Tooltip>
    </div>
  ),
};

export const CustomDelay: Story = {
  args: {
    content: 'Tooltip with 1 second delay',
    children: <Button label="Long hover" />,
    delay: 1000,
  },
};

export const LongContent: Story = {
  args: {
    content:
      'This is a tooltip with much longer content that demonstrates how tooltips handle more text',
    children: <Button label="Hover for long tooltip" />,
  },
};
