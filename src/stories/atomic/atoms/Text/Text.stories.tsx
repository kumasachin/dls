import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../../../../atomic/atoms/Text/Text';

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
};
export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: 'Sample text',
    as: 'span',
    style: { color: '#333', fontWeight: 500 },
  },
};

export const Heading: Story = {
  args: {
    children: 'Heading Example',
    as: 'h2',
    style: { color: '#0070f3', fontWeight: 700, fontSize: 24 },
  },
};
