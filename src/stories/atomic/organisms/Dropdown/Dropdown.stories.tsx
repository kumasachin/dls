import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../../../../atomic/atoms/Button/Button';
import { Text } from '../../../../atomic/atoms/Text/Text';
import { Dropdown } from '../../../../atomic/organisms/Dropdown/Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Organisms/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Accessible dropdown component with compound API pattern. Features keyboard navigation, focus management, and ARIA compliance.',
      },
    },
  },
  argTypes: {
    defaultOpen: {
      control: 'boolean',
      description: 'Whether the dropdown is initially open',
    },
    onOpenChange: {
      action: 'openChange',
      description: 'Callback when dropdown open state changes',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const BasicDropdown: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item onSelect={() => console.log('Profile')}>Profile</Dropdown.Item>
        <Dropdown.Item onSelect={() => console.log('Settings')}>Settings</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item onSelect={() => console.log('Logout')}>Logout</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  ),
};

export const TriggerVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Dropdown>
        <Dropdown.Trigger variant="default">Default</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item>Option 1</Dropdown.Item>
          <Dropdown.Item>Option 2</Dropdown.Item>
          <Dropdown.Item>Option 3</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>

      <Dropdown>
        <Dropdown.Trigger variant="outline">Outline</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item>Option 1</Dropdown.Item>
          <Dropdown.Item>Option 2</Dropdown.Item>
          <Dropdown.Item>Option 3</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>

      <Dropdown>
        <Dropdown.Trigger variant="ghost">Ghost</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item>Option 1</Dropdown.Item>
          <Dropdown.Item>Option 2</Dropdown.Item>
          <Dropdown.Item>Option 3</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    </div>
  ),
};

export const TriggerSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Dropdown>
        <Dropdown.Trigger size="sm">Small</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item>Small dropdown item</Dropdown.Item>
          <Dropdown.Item>Another item</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>

      <Dropdown>
        <Dropdown.Trigger size="md">Medium</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item>Medium dropdown item</Dropdown.Item>
          <Dropdown.Item>Another item</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>

      <Dropdown>
        <Dropdown.Trigger size="lg">Large</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item>Large dropdown item</Dropdown.Item>
          <Dropdown.Item>Another item</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    </div>
  ),
};

export const ContentAlignment: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '100px', justifyContent: 'center', padding: '50px 0' }}>
      <Dropdown>
        <Dropdown.Trigger>Align Start</Dropdown.Trigger>
        <Dropdown.Content align="start">
          <Dropdown.Item>This content aligns to the start</Dropdown.Item>
          <Dropdown.Item>Left edge alignment</Dropdown.Item>
          <Dropdown.Item>Option 3</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>

      <Dropdown>
        <Dropdown.Trigger>Align Center</Dropdown.Trigger>
        <Dropdown.Content align="center">
          <Dropdown.Item>This content is centered</Dropdown.Item>
          <Dropdown.Item>Center alignment</Dropdown.Item>
          <Dropdown.Item>Option 3</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>

      <Dropdown>
        <Dropdown.Trigger>Align End</Dropdown.Trigger>
        <Dropdown.Content align="end">
          <Dropdown.Item>This content aligns to the end</Dropdown.Item>
          <Dropdown.Item>Right edge alignment</Dropdown.Item>
          <Dropdown.Item>Option 3</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    </div>
  ),
};

export const WithDisabledItems: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>Menu with Disabled Items</Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item onSelect={() => console.log('New')}>New File</Dropdown.Item>
        <Dropdown.Item onSelect={() => console.log('Open')}>Open File</Dropdown.Item>
        <Dropdown.Item disabled>Recent Files (None)</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item onSelect={() => console.log('Save')}>Save</Dropdown.Item>
        <Dropdown.Item disabled>Save As... (No file open)</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item onSelect={() => console.log('Exit')}>Exit</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  ),
};

export const ComplexItems: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>User Menu</Dropdown.Trigger>
      <Dropdown.Content style={{ minWidth: '220px' }}>
        <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--color-border)' }}>
          <Text weight="semibold" size="sm">
            John Doe
          </Text>
          <Text variant="muted" size="xs" style={{ marginTop: '2px' }}>
            john.doe@example.com
          </Text>
        </div>

        <Dropdown.Item onSelect={() => console.log('Profile')}>
          <span>👤</span>
          <span>Profile Settings</span>
        </Dropdown.Item>

        <Dropdown.Item onSelect={() => console.log('Billing')}>
          <span>💳</span>
          <span>Billing & Plans</span>
        </Dropdown.Item>

        <Dropdown.Item onSelect={() => console.log('Team')}>
          <span>👥</span>
          <span>Team Management</span>
        </Dropdown.Item>

        <Dropdown.Separator />

        <Dropdown.Item onSelect={() => console.log('Support')}>
          <span>❓</span>
          <span>Help & Support</span>
        </Dropdown.Item>

        <Dropdown.Separator />

        <Dropdown.Item onSelect={() => console.log('Logout')}>
          <span>🚪</span>
          <span>Sign Out</span>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  ),
};

export const ControlledDropdown: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('None');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
        <div>
          <Text weight="medium">Selected Option: {selectedOption}</Text>
          <Text variant="muted" size="sm" style={{ marginTop: '4px' }}>
            Dropdown is currently: {isOpen ? 'Open' : 'Closed'}
          </Text>
        </div>

        <Dropdown onOpenChange={setIsOpen}>
          <Dropdown.Trigger>Choose an Option</Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item onSelect={() => setSelectedOption('Option 1')}>Option 1</Dropdown.Item>
            <Dropdown.Item onSelect={() => setSelectedOption('Option 2')}>Option 2</Dropdown.Item>
            <Dropdown.Item onSelect={() => setSelectedOption('Option 3')}>Option 3</Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item onSelect={() => setSelectedOption('None')}>
              Clear Selection
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="secondary" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'Close' : 'Open'} Dropdown
          </Button>
          <Button variant="ghost" onClick={() => setSelectedOption('None')}>
            Reset
          </Button>
        </div>
      </div>
    );
  },
};

export const CustomTrigger: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <Dropdown>
        <Dropdown.Trigger asChild>
          <Button variant="primary">Custom Button Trigger</Button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item>Action 1</Dropdown.Item>
          <Dropdown.Item>Action 2</Dropdown.Item>
          <Dropdown.Item>Action 3</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>

      <Dropdown>
        <Dropdown.Trigger asChild>
          <div
            style={{
              padding: '8px 12px',
              border: '2px dashed var(--color-border)',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'inline-block',
            }}
          >
            Custom Element Trigger
          </div>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item>Custom action 1</Dropdown.Item>
          <Dropdown.Item>Custom action 2</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    </div>
  ),
};

export const AccessibilityDemo: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <div>
        <Text size="lg" weight="semibold" style={{ marginBottom: '12px' }}>
          Accessibility Features
        </Text>
        <ul style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
          <li>
            <strong>Keyboard Navigation:</strong> Arrow keys to navigate, Enter/Space to select
          </li>
          <li>
            <strong>Focus Management:</strong> Proper focus trapping and restoration
          </li>
          <li>
            <strong>ARIA Compliance:</strong> Proper roles, states, and properties
          </li>
          <li>
            <strong>Screen Reader Support:</strong> Announced state changes and descriptions
          </li>
          <li>
            <strong>Escape to Close:</strong> Press Escape key to close dropdown
          </li>
          <li>
            <strong>Click Outside:</strong> Click outside to close dropdown
          </li>
        </ul>
      </div>

      <Dropdown>
        <Dropdown.Trigger>Test Accessibility Features</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item onSelect={() => console.log('Item 1')}>
            First Item (try arrow keys)
          </Dropdown.Item>
          <Dropdown.Item onSelect={() => console.log('Item 2')}>Second Item</Dropdown.Item>
          <Dropdown.Item disabled>Disabled Item (skipped in navigation)</Dropdown.Item>
          <Dropdown.Item onSelect={() => console.log('Item 3')}>Third Item</Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item onSelect={() => console.log('Last')}>
            Last Item (try Home/End keys)
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>

      <Text variant="muted" size="sm">
        Use Tab to focus the trigger, then arrow keys to navigate items. Press Enter or Space to
        select, Escape to close.
      </Text>
    </div>
  ),
};
