import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../../../../atomic/atoms/Button/Button';
import { Card } from '../../../../atomic/atoms/Card/Card';
import { Input } from '../../../../atomic/atoms/Input/Input';
import { FormField } from '../../../../atomic/molecules/FormField/FormField';
import { Tabs } from '../../../../atomic/organisms/Tabs/Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Organisms/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the tabs',
    },
    variant: {
      control: 'radio',
      options: ['default', 'pills', 'underlined'],
      description: 'Visual style variant',
    },
    defaultTab: {
      control: 'text',
      description: 'Default active tab (uncontrolled)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicTabs: Story = {
  args: {
    defaultTab: 'overview',
    orientation: 'horizontal',
    variant: 'default',
  },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List aria-label="Content sections">
        <Tabs.Tab tabId="overview">Overview</Tabs.Tab>
        <Tabs.Tab tabId="features">Features</Tabs.Tab>
        <Tabs.Tab tabId="pricing">Pricing</Tabs.Tab>
        <Tabs.Tab tabId="support">Support</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel tabId="overview">
          <Card>
            <h3 style={{ marginTop: 0 }}>Product Overview</h3>
            <p>
              Welcome to our amazing product! This overview section gives you a comprehensive
              introduction to what we offer and how it can benefit your workflow.
            </p>
            <p>
              Our solution is designed with simplicity and power in mind, making it perfect for both
              beginners and advanced users.
            </p>
          </Card>
        </Tabs.Panel>
        <Tabs.Panel tabId="features">
          <Card>
            <h3 style={{ marginTop: 0 }}>Key Features</h3>
            <ul>
              <li>🚀 Lightning-fast performance</li>
              <li>🔒 Enterprise-grade security</li>
              <li>📱 Mobile-responsive design</li>
              <li>🎨 Customizable themes</li>
              <li>🔧 Powerful integrations</li>
            </ul>
          </Card>
        </Tabs.Panel>
        <Tabs.Panel tabId="pricing">
          <Card>
            <h3 style={{ marginTop: 0 }}>Pricing Plans</h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
              }}
            >
              <div style={{ border: '1px solid #e0e0e0', padding: '16px', borderRadius: '8px' }}>
                <h4>Starter</h4>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>$9/month</p>
                <p>Perfect for individuals</p>
              </div>
              <div style={{ border: '1px solid #e0e0e0', padding: '16px', borderRadius: '8px' }}>
                <h4>Professional</h4>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>$29/month</p>
                <p>Great for small teams</p>
              </div>
            </div>
          </Card>
        </Tabs.Panel>
        <Tabs.Panel tabId="support">
          <Card>
            <h3 style={{ marginTop: 0 }}>Get Support</h3>
            <p>Need help? We're here for you!</p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <Button variant="primary">Contact Support</Button>
              <Button variant="secondary">View Documentation</Button>
            </div>
          </Card>
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  ),
};

export const VerticalTabs: Story = {
  render: () => (
    <div style={{ height: '400px' }}>
      <Tabs defaultTab="account" orientation="vertical" variant="underlined">
        <Tabs.List aria-label="Settings navigation">
          <Tabs.Tab tabId="account">Account</Tabs.Tab>
          <Tabs.Tab tabId="security">Security</Tabs.Tab>
          <Tabs.Tab tabId="notifications">Notifications</Tabs.Tab>
          <Tabs.Tab tabId="billing">Billing</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel tabId="account">
            <Card>
              <h3 style={{ marginTop: 0 }}>Account Settings</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <FormField label="Full Name">
                  <Input value="John Doe" onChange={() => {}} />
                </FormField>
                <FormField label="Email Address">
                  <Input value="john@example.com" onChange={() => {}} />
                </FormField>
                <FormField label="Username">
                  <Input value="johndoe" onChange={() => {}} />
                </FormField>
              </div>
            </Card>
          </Tabs.Panel>
          <Tabs.Panel tabId="security">
            <Card>
              <h3 style={{ marginTop: 0 }}>Security Settings</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <FormField label="Current Password">
                  <Input type="password" value="" onChange={() => {}} />
                </FormField>
                <FormField label="New Password">
                  <Input type="password" value="" onChange={() => {}} />
                </FormField>
                <FormField label="Confirm Password">
                  <Input type="password" value="" onChange={() => {}} />
                </FormField>
                <Button variant="primary">Update Password</Button>
              </div>
            </Card>
          </Tabs.Panel>
          <Tabs.Panel tabId="notifications">
            <Card>
              <h3 style={{ marginTop: 0 }}>Notification Preferences</h3>
              <p>Configure how you'd like to receive notifications.</p>
              <div style={{ marginTop: '16px' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '12px',
                  }}
                >
                  <input type="checkbox" defaultChecked />
                  Email notifications
                </label>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '12px',
                  }}
                >
                  <input type="checkbox" defaultChecked />
                  Push notifications
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" />
                  SMS notifications
                </label>
              </div>
            </Card>
          </Tabs.Panel>
          <Tabs.Panel tabId="billing">
            <Card>
              <h3 style={{ marginTop: 0 }}>Billing Information</h3>
              <p>Manage your subscription and payment methods.</p>
              <div style={{ marginTop: '16px' }}>
                <p>
                  <strong>Current Plan:</strong> Professional ($29/month)
                </p>
                <p>
                  <strong>Next Billing Date:</strong> January 15, 2025
                </p>
                <Button variant="secondary" style={{ marginTop: '12px' }}>
                  Manage Subscription
                </Button>
              </div>
            </Card>
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    </div>
  ),
};

export const PillVariant: Story = {
  render: () => (
    <Tabs defaultTab="design" variant="pills">
      <Tabs.List aria-label="Design system sections">
        <Tabs.Tab tabId="design">Design</Tabs.Tab>
        <Tabs.Tab tabId="components">Components</Tabs.Tab>
        <Tabs.Tab tabId="patterns">Patterns</Tabs.Tab>
        <Tabs.Tab tabId="resources">Resources</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel tabId="design">
          <h3>Design Guidelines</h3>
          <p>Explore our design principles, color palettes, and typography guidelines.</p>
        </Tabs.Panel>
        <Tabs.Panel tabId="components">
          <h3>Component Library</h3>
          <p>Browse our comprehensive collection of reusable UI components.</p>
        </Tabs.Panel>
        <Tabs.Panel tabId="patterns">
          <h3>Design Patterns</h3>
          <p>Learn about common interaction patterns and best practices.</p>
        </Tabs.Panel>
        <Tabs.Panel tabId="resources">
          <h3>Additional Resources</h3>
          <p>Downloads, templates, and links to helpful design tools.</p>
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  ),
};

export const ControlledTabs: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('tab1');
    const [counter, setCounter] = useState(0);

    return (
      <div>
        <div style={{ marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button
            onClick={() => setActiveTab('tab1')}
            variant={activeTab === 'tab1' ? 'primary' : 'secondary'}
          >
            Switch to Tab 1
          </Button>
          <Button
            onClick={() => setActiveTab('tab2')}
            variant={activeTab === 'tab2' ? 'primary' : 'secondary'}
          >
            Switch to Tab 2
          </Button>
          <Button
            onClick={() => setActiveTab('tab3')}
            variant={activeTab === 'tab3' ? 'primary' : 'secondary'}
          >
            Switch to Tab 3
          </Button>
        </div>

        <Tabs activeTab={activeTab} onTabChange={setActiveTab} variant="underlined">
          <Tabs.List aria-label="Controlled example">
            <Tabs.Tab tabId="tab1">Interactive Tab 1</Tabs.Tab>
            <Tabs.Tab tabId="tab2">Interactive Tab 2</Tabs.Tab>
            <Tabs.Tab tabId="tab3">Interactive Tab 3</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel tabId="tab1">
              <Card>
                <h3>Tab 1 Content</h3>
                <p>This tab is controlled externally. Current counter: {counter}</p>
                <Button onClick={() => setCounter((c) => c + 1)}>Increment Counter</Button>
              </Card>
            </Tabs.Panel>
            <Tabs.Panel tabId="tab2">
              <Card>
                <h3>Tab 2 Content</h3>
                <p>The active tab is controlled by external state.</p>
                <p>Try using the buttons above or clicking the tabs directly.</p>
              </Card>
            </Tabs.Panel>
            <Tabs.Panel tabId="tab3">
              <Card>
                <h3>Tab 3 Content</h3>
                <p>State is synchronized between external controls and tab clicks.</p>
                <Button onClick={() => setCounter(0)} variant="secondary">
                  Reset Counter
                </Button>
              </Card>
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      </div>
    );
  },
};

export const WithDisabledTabs: Story = {
  render: () => (
    <Tabs defaultTab="available">
      <Tabs.List aria-label="Feature availability">
        <Tabs.Tab tabId="available">Available</Tabs.Tab>
        <Tabs.Tab tabId="beta">Beta Features</Tabs.Tab>
        <Tabs.Tab tabId="coming-soon" disabled>
          Coming Soon
        </Tabs.Tab>
        <Tabs.Tab tabId="enterprise" disabled>
          Enterprise Only
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel tabId="available">
          <Card>
            <h3>Available Features</h3>
            <p>These features are fully available and stable for all users:</p>
            <ul>
              <li>User management</li>
              <li>Basic reporting</li>
              <li>Email integration</li>
              <li>Mobile app</li>
            </ul>
          </Card>
        </Tabs.Panel>
        <Tabs.Panel tabId="beta">
          <Card>
            <h3>Beta Features</h3>
            <p>These features are available for testing. Use with caution:</p>
            <ul>
              <li>Advanced analytics (Beta)</li>
              <li>AI-powered insights (Beta)</li>
              <li>Custom workflows (Beta)</li>
            </ul>
          </Card>
        </Tabs.Panel>
        <Tabs.Panel tabId="coming-soon">
          <Card>
            <h3>Coming Soon</h3>
            <p>Features in development that will be available soon.</p>
          </Card>
        </Tabs.Panel>
        <Tabs.Panel tabId="enterprise">
          <Card>
            <h3>Enterprise Features</h3>
            <p>Premium features available for enterprise customers.</p>
          </Card>
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  ),
};

export const AccessibilityDemo: Story = {
  render: () => (
    <div>
      <div
        style={{
          marginBottom: '24px',
          padding: '16px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
        }}
      >
        <h3 style={{ marginTop: 0 }}>Accessibility Features</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Full keyboard navigation with arrow keys, Home, and End</li>
          <li>ARIA labels and semantic HTML structure</li>
          <li>Screen reader announcements for tab changes</li>
          <li>Focus management and visible focus indicators</li>
          <li>Disabled state handling</li>
        </ul>
      </div>

      <Tabs defaultTab="keyboard">
        <Tabs.List aria-label="Accessibility features demonstration">
          <Tabs.Tab tabId="keyboard">Keyboard Navigation</Tabs.Tab>
          <Tabs.Tab tabId="screen-reader">Screen Reader</Tabs.Tab>
          <Tabs.Tab tabId="focus">Focus Management</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel tabId="keyboard">
            <Card>
              <h3>Keyboard Navigation</h3>
              <p>Try these keyboard shortcuts:</p>
              <ul>
                <li>
                  <kbd>Tab</kbd> - Move focus to the tab list
                </li>
                <li>
                  <kbd>←</kbd> / <kbd>→</kbd> - Navigate between tabs horizontally
                </li>
                <li>
                  <kbd>↑</kbd> / <kbd>↓</kbd> - Navigate between tabs vertically
                </li>
                <li>
                  <kbd>Home</kbd> - Jump to first tab
                </li>
                <li>
                  <kbd>End</kbd> - Jump to last tab
                </li>
                <li>
                  <kbd>Enter</kbd> / <kbd>Space</kbd> - Activate focused tab
                </li>
              </ul>
            </Card>
          </Tabs.Panel>
          <Tabs.Panel tabId="screen-reader">
            <Card>
              <h3>Screen Reader Support</h3>
              <p>This component provides proper ARIA attributes:</p>
              <ul>
                <li>
                  <code>role="tablist"</code> on the tab container
                </li>
                <li>
                  <code>role="tab"</code> on each tab button
                </li>
                <li>
                  <code>role="tabpanel"</code> on each content panel
                </li>
                <li>
                  <code>aria-selected</code> indicates the active tab
                </li>
                <li>
                  <code>aria-controls</code> links tabs to their panels
                </li>
                <li>
                  <code>aria-labelledby</code> links panels to their tabs
                </li>
              </ul>
            </Card>
          </Tabs.Panel>
          <Tabs.Panel tabId="focus">
            <Card>
              <h3>Focus Management</h3>
              <p>Focus behavior is carefully managed:</p>
              <ul>
                <li>Only the active tab is in the tab sequence (tabindex="0")</li>
                <li>Inactive tabs have tabindex="-1"</li>
                <li>Focus moves automatically when navigating with arrow keys</li>
                <li>Focus indicators are clearly visible</li>
                <li>Disabled tabs are properly excluded from navigation</li>
              </ul>
            </Card>
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    </div>
  ),
};
