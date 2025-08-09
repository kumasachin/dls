import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../../../../atomic/atoms/Button/Button';
import { Card } from '../../../../atomic/atoms/Card/Card';
import { Accordion } from '../../../../atomic/organisms/Accordion/Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Organisms/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    allowMultiple: {
      control: 'boolean',
      description: 'Whether multiple items can be open simultaneously',
    },
    variant: {
      control: 'radio',
      options: ['default', 'bordered', 'filled'],
      description: 'Visual style variant',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Size of the accordion items',
    },
    defaultOpen: {
      control: 'text',
      description: 'Default open items (uncontrolled)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicAccordion: Story = {
  args: {
    defaultOpen: 'faq1',
    allowMultiple: false,
    variant: 'default',
    size: 'medium',
  },
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item itemId="faq1">
        <Accordion.Trigger>What is this design system?</Accordion.Trigger>
        <Accordion.Content>
          <p>
            This is a comprehensive design system built with React and TypeScript. It provides a
            collection of reusable components, design tokens, and guidelines to help you build
            consistent and accessible user interfaces.
          </p>
          <p>
            The system includes atoms, molecules, and organisms following the atomic design
            methodology.
          </p>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item itemId="faq2">
        <Accordion.Trigger>How do I install it?</Accordion.Trigger>
        <Accordion.Content>
          <p>You can install the design system using npm or yarn:</p>
          <pre
            style={{
              backgroundColor: '#f5f5f5',
              padding: '12px',
              borderRadius: '4px',
              overflow: 'auto',
            }}
          >
            <code>npm install @kumasachin/dls</code>
          </pre>
          <p>Then import the components you need:</p>
          <pre
            style={{
              backgroundColor: '#f5f5f5',
              padding: '12px',
              borderRadius: '4px',
              overflow: 'auto',
            }}
          >
            <code>{`import { Button, Card } from '@kumasachin/dls';`}</code>
          </pre>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item itemId="faq3">
        <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
        <Accordion.Content>
          <p>
            Yes! All components are built with accessibility in mind and follow WCAG guidelines:
          </p>
          <ul>
            <li>Proper ARIA attributes and semantic HTML</li>
            <li>Keyboard navigation support</li>
            <li>Screen reader compatibility</li>
            <li>Focus management</li>
            <li>Color contrast compliance</li>
          </ul>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item itemId="faq4">
        <Accordion.Trigger>Can I customize the components?</Accordion.Trigger>
        <Accordion.Content>
          <p>Absolutely! The design system is built with customization in mind:</p>
          <ul>
            <li>CSS custom properties for theming</li>
            <li>Variant props for different styles</li>
            <li>Compound component patterns for flexibility</li>
            <li>TypeScript support for better development experience</li>
          </ul>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const MultipleOpen: Story = {
  render: () => (
    <Accordion allowMultiple defaultOpen={['feature1', 'feature3']}>
      <Accordion.Item itemId="feature1">
        <Accordion.Trigger>Performance</Accordion.Trigger>
        <Accordion.Content>
          <p>Optimized for speed with minimal bundle size and efficient rendering.</p>
          <ul>
            <li>Tree-shaking support</li>
            <li>Lazy loading capabilities</li>
            <li>Minimal re-renders</li>
          </ul>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item itemId="feature2">
        <Accordion.Trigger>Developer Experience</Accordion.Trigger>
        <Accordion.Content>
          <p>Built with developers in mind for a smooth development experience.</p>
          <ul>
            <li>TypeScript support</li>
            <li>Comprehensive documentation</li>
            <li>Storybook integration</li>
            <li>VSCode snippets</li>
          </ul>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item itemId="feature3">
        <Accordion.Trigger>Design Consistency</Accordion.Trigger>
        <Accordion.Content>
          <p>Maintain visual and behavioral consistency across your application.</p>
          <ul>
            <li>Design tokens</li>
            <li>Standardized spacing</li>
            <li>Consistent color palette</li>
            <li>Typography scale</li>
          </ul>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const BorderedVariant: Story = {
  render: () => (
    <Accordion variant="bordered" defaultOpen="step1">
      <Accordion.Item itemId="step1">
        <Accordion.Trigger>Step 1: Setup</Accordion.Trigger>
        <Accordion.Content>
          <p>First, install the necessary dependencies and set up your project structure.</p>
          <div style={{ marginTop: '16px' }}>
            <Button variant="primary" size="sm">
              View Setup Guide
            </Button>
          </div>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item itemId="step2">
        <Accordion.Trigger>Step 2: Configuration</Accordion.Trigger>
        <Accordion.Content>
          <p>Configure your build tools and development environment.</p>
          <div style={{ marginTop: '16px' }}>
            <Button variant="secondary" size="sm">
              Configuration Docs
            </Button>
          </div>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item itemId="step3">
        <Accordion.Trigger>Step 3: Implementation</Accordion.Trigger>
        <Accordion.Content>
          <p>Start implementing components in your application.</p>
          <div style={{ marginTop: '16px' }}>
            <Button variant="secondary" size="sm">
              Component Examples
            </Button>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const FilledVariant: Story = {
  render: () => (
    <Accordion variant="filled" size="large">
      <Accordion.Item itemId="product1">
        <Accordion.Trigger>Basic Plan</Accordion.Trigger>
        <Accordion.Content>
          <Card>
            <h4 style={{ marginTop: 0 }}>Basic Plan - $9/month</h4>
            <ul>
              <li>Up to 5 projects</li>
              <li>Basic analytics</li>
              <li>Email support</li>
              <li>1GB storage</li>
            </ul>
            <Button variant="primary">Choose Basic</Button>
          </Card>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item itemId="product2">
        <Accordion.Trigger>Professional Plan</Accordion.Trigger>
        <Accordion.Content>
          <Card>
            <h4 style={{ marginTop: 0 }}>Professional Plan - $29/month</h4>
            <ul>
              <li>Unlimited projects</li>
              <li>Advanced analytics</li>
              <li>Priority support</li>
              <li>10GB storage</li>
              <li>Team collaboration</li>
            </ul>
            <Button variant="primary">Choose Professional</Button>
          </Card>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item itemId="product3">
        <Accordion.Trigger>Enterprise Plan</Accordion.Trigger>
        <Accordion.Content>
          <Card>
            <h4 style={{ marginTop: 0 }}>Enterprise Plan - Custom pricing</h4>
            <ul>
              <li>Everything in Professional</li>
              <li>Custom integrations</li>
              <li>Dedicated support</li>
              <li>Unlimited storage</li>
              <li>Advanced security</li>
              <li>SLA guarantee</li>
            </ul>
            <Button variant="primary">Contact Sales</Button>
          </Card>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const ControlledAccordion: Story = {
  render: () => {
    const [openItems, setOpenItems] = useState<string[]>(['section1']);

    return (
      <div>
        <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button
            onClick={() => setOpenItems(['section1'])}
            variant={openItems.includes('section1') ? 'primary' : 'secondary'}
            size="sm"
          >
            Open Section 1
          </Button>
          <Button
            onClick={() => setOpenItems(['section2'])}
            variant={openItems.includes('section2') ? 'primary' : 'secondary'}
            size="sm"
          >
            Open Section 2
          </Button>
          <Button
            onClick={() => setOpenItems(['section3'])}
            variant={openItems.includes('section3') ? 'primary' : 'secondary'}
            size="sm"
          >
            Open Section 3
          </Button>
          <Button onClick={() => setOpenItems([])} variant="secondary" size="sm">
            Close All
          </Button>
        </div>

        <Accordion openItems={openItems} onToggle={setOpenItems} variant="bordered">
          <Accordion.Item itemId="section1">
            <Accordion.Trigger>Controlled Section 1</Accordion.Trigger>
            <Accordion.Content>
              <p>This accordion is controlled by external state.</p>
              <p>Current open items: {openItems.join(', ') || 'None'}</p>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item itemId="section2">
            <Accordion.Trigger>Controlled Section 2</Accordion.Trigger>
            <Accordion.Content>
              <p>Use the buttons above to control which sections are open.</p>
              <p>You can also click the accordion triggers directly.</p>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item itemId="section3">
            <Accordion.Trigger>Controlled Section 3</Accordion.Trigger>
            <Accordion.Content>
              <p>The state is synchronized between external controls and accordion interactions.</p>
              <Button onClick={() => setOpenItems([])} variant="secondary" size="sm">
                Close from inside
              </Button>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>
    );
  },
};

export const WithDisabledItems: Story = {
  render: () => (
    <Accordion defaultOpen="available">
      <Accordion.Item itemId="available">
        <Accordion.Trigger>Available Features</Accordion.Trigger>
        <Accordion.Content>
          <p>These features are currently available:</p>
          <ul>
            <li>Basic authentication</li>
            <li>File uploads</li>
            <li>Email notifications</li>
            <li>Basic reporting</li>
          </ul>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item itemId="beta">
        <Accordion.Trigger>Beta Features</Accordion.Trigger>
        <Accordion.Content>
          <p>These features are in beta testing:</p>
          <ul>
            <li>Advanced search</li>
            <li>Real-time collaboration</li>
            <li>Custom workflows</li>
          </ul>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item itemId="coming-soon" disabled>
        <Accordion.Trigger>Coming Soon</Accordion.Trigger>
        <Accordion.Content>
          <p>Features planned for future releases.</p>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item itemId="enterprise" disabled>
        <Accordion.Trigger>Enterprise Only</Accordion.Trigger>
        <Accordion.Content>
          <p>Premium features for enterprise customers.</p>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3>Small Size</h3>
        <Accordion size="small" variant="bordered" defaultOpen="small1">
          <Accordion.Item itemId="small1">
            <Accordion.Trigger>Small accordion item</Accordion.Trigger>
            <Accordion.Content>Compact content for small spaces.</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item itemId="small2">
            <Accordion.Trigger>Another small item</Accordion.Trigger>
            <Accordion.Content>Perfect for sidebars or mobile interfaces.</Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>

      <div>
        <h3>Medium Size (Default)</h3>
        <Accordion size="medium" variant="bordered" defaultOpen="medium1">
          <Accordion.Item itemId="medium1">
            <Accordion.Trigger>Medium accordion item</Accordion.Trigger>
            <Accordion.Content>Standard size for most use cases.</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item itemId="medium2">
            <Accordion.Trigger>Another medium item</Accordion.Trigger>
            <Accordion.Content>Good balance between content and spacing.</Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>

      <div>
        <h3>Large Size</h3>
        <Accordion size="large" variant="bordered" defaultOpen="large1">
          <Accordion.Item itemId="large1">
            <Accordion.Trigger>Large accordion item</Accordion.Trigger>
            <Accordion.Content>Spacious design for prominent content sections.</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item itemId="large2">
            <Accordion.Trigger>Another large item</Accordion.Trigger>
            <Accordion.Content>
              Ideal for desktop applications and detailed content.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
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
          <li>Full keyboard navigation with arrow keys</li>
          <li>ARIA attributes for screen readers</li>
          <li>Semantic HTML with proper heading structure</li>
          <li>Focus management and visible focus indicators</li>
          <li>Disabled state handling</li>
          <li>Proper expand/collapse announcements</li>
        </ul>
      </div>

      <Accordion>
        <Accordion.Item itemId="keyboard">
          <Accordion.Trigger aria-level={2}>Keyboard Navigation</Accordion.Trigger>
          <Accordion.Content>
            <p>Try these keyboard shortcuts:</p>
            <ul>
              <li>
                <kbd>Tab</kbd> - Move focus to accordion triggers
              </li>
              <li>
                <kbd>↓</kbd> / <kbd>↑</kbd> - Navigate between triggers
              </li>
              <li>
                <kbd>Enter</kbd> / <kbd>Space</kbd> - Toggle expanded state
              </li>
              <li>
                <kbd>Tab</kbd> - Move focus into expanded content
              </li>
            </ul>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item itemId="screen-reader">
          <Accordion.Trigger aria-level={2}>Screen Reader Support</Accordion.Trigger>
          <Accordion.Content>
            <p>This component provides proper ARIA attributes:</p>
            <ul>
              <li>
                <code>role="heading"</code> with appropriate level
              </li>
              <li>
                <code>aria-expanded</code> indicates collapse state
              </li>
              <li>
                <code>aria-controls</code> links triggers to content
              </li>
              <li>
                <code>aria-labelledby</code> links content to triggers
              </li>
              <li>
                <code>role="region"</code> on content areas
              </li>
            </ul>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item itemId="semantic">
          <Accordion.Trigger aria-level={2}>Semantic Structure</Accordion.Trigger>
          <Accordion.Content>
            <p>The component uses semantic HTML:</p>
            <ul>
              <li>Proper heading hierarchy with configurable levels</li>
              <li>Button elements for interactive triggers</li>
              <li>Region landmarks for content areas</li>
              <li>Logical tab order and focus flow</li>
            </ul>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};
