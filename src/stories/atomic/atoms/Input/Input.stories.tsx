import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from "../../../../atomic/atoms/Input/Input";
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  argTypes: {
    value: { control: 'text' },
    onChange: { action: 'changed' },
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    value: 'Hello',
    placeholder: 'Type here...',
    onChange: () => {},
  },
  render: (args) => {
    const [val, setVal] = useState(args.value);
    return <Input {...args} value={val} onChange={e => setVal(e.target.value)} />;
  },
};
