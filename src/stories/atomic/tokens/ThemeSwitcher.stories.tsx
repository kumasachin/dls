import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '../../../tokens/themes/ThemeProvider';
import { ThemeSwitcher } from '../../../tokens/themes/ThemeSwitcher';

const meta = {
  title: 'Design Tokens/ThemeSwitcher',
  component: ThemeSwitcher,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A component to switch between different themes in the design system. Demonstrates the theme system with light, dark, corporate, and playful variants.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ minHeight: '200px', padding: '20px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithDemoContent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <ThemeSwitcher />
      <div
        style={{
          padding: '20px',
          background: 'var(--color-surface-1)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <h3
          style={{
            color: 'var(--color-text-primary)',
            marginTop: 0,
            fontFamily: 'var(--font-family-sans)',
          }}
        >
          Theme Demo
        </h3>
        <p
          style={{
            color: 'var(--color-text-secondary)',
            fontFamily: 'var(--font-family-sans)',
          }}
        >
          This content uses theme tokens and will change appearance when you switch themes above.
        </p>
        <button
          type="button"
          style={{
            padding: 'var(--space-sm) var(--space-md)',
            background: 'var(--button-primary-bg)',
            color: 'var(--button-primary-text)',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            fontFamily: 'var(--font-family-sans)',
          }}
        >
          Primary Button
        </button>
      </div>
    </div>
  ),
};
