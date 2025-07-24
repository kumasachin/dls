import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from '../../../../atomic/atoms/Divider/Divider';

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <div>Content above divider</div>
      <Divider />
      <div>Content below divider</div>
    </div>
  ),
};

export const CustomColor: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <div>Content above divider</div>
      <Divider color="#ff5722" />
      <div>Content below divider</div>
    </div>
  ),
};

export const CustomMargin: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <div>Content above divider with custom margin</div>
      <Divider margin="32px 0" />
      <div>Content below divider with custom margin</div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ padding: '20px', display: 'flex', height: '100px' }}>
      <div>Left content</div>
      <Divider vertical margin="0 16px" />
      <div>Right content</div>
    </div>
  ),
};

export const Thickness: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <div>Content above thick divider</div>
      <Divider thickness={3} />
      <div>Content below thick divider</div>
    </div>
  ),
};
