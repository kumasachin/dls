import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputWithLabel } from '../../../../atomic/molecules/InputWithLabel/InputWithLabel';
import React, { useState } from 'react';

const meta: Meta<typeof InputWithLabel> = {
  title: 'Molecules/InputWithLabel',
  component: InputWithLabel,
};
export default meta;

type Story = StoryObj<typeof InputWithLabel>;

export const Default: Story = {
  args: {
    label: 'Username',
    value: '',
    onChange: () => {},
  },
  render: (args) => {
    const [val, setVal] = useState('');
    return <InputWithLabel {...args} value={val} onChange={e => setVal(e.target.value)} />;
  },
};
