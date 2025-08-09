import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../../../../atomic/atoms/Button/Button';
import { Input } from '../../../../atomic/atoms/Input/Input';
import { FormField } from '../../../../atomic/molecules/FormField/FormField';
import { Modal } from '../../../../atomic/organisms/Modal/Modal';

const meta: Meta<typeof Modal> = {
  title: 'Organisms/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Accessible modal component with compound API pattern for flexible composition. Built with WCAG 2.1 AA compliance.',
      },
    },
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is open',
    },
    onClose: {
      action: 'closed',
      description: 'Callback function when modal is closed',
    },
    width: {
      control: 'text',
      description: 'Width of the modal (CSS value)',
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Whether to close on backdrop click',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether to close on Escape key',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const BasicModal: Story = {
  args: {
    isOpen: false,
    closeOnBackdropClick: true,
    closeOnEscape: true,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Modal.Header>
            <Modal.Title>Basic Modal</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <p>This is a basic modal with header, body, and footer sections.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Confirm</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

export const SimpleDialog: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Simple Dialog</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} width="400px">
          <Modal.Header>
            <Modal.Title>Confirm Action</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this item? This action cannot be undone.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => setIsOpen(false)}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

export const FormModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      setIsOpen(false);
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Contact Form</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} width="600px">
          <Modal.Header>
            <Modal.Title>Contact Us</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <FormField label="Full Name" required>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                />
              </FormField>

              <FormField label="Email Address" required hint="We'll never share your email">
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                />
              </FormField>

              <FormField label="Message" required>
                <Input
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help you?"
                />
              </FormField>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSubmit}>
              Send Message
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

export const MinimalModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Minimal Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Modal.Body>
            <h3 style={{ margin: 0, marginBottom: '16px' }}>Quick Notification</h3>
            <p style={{ margin: 0 }}>This is a minimal modal with just a body section.</p>
          </Modal.Body>
        </Modal>
      </>
    );
  },
};

export const LargeModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Large Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} width="800px">
          <Modal.Header>
            <Modal.Title>Settings & Preferences</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <h4 style={{ marginTop: 0, marginBottom: '16px' }}>Account Settings</h4>
                <FormField label="Display Name">
                  <Input value="John Doe" onChange={() => {}} />
                </FormField>
              </div>
              <div>
                <h4 style={{ marginTop: 0, marginBottom: '16px' }}>Notifications</h4>
                <FormField label="Email Frequency" hint="How often you receive emails">
                  <Input value="Weekly" onChange={() => {}} />
                </FormField>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Reset to Defaults
            </Button>
            <Button onClick={() => setIsOpen(false)}>Save Changes</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

export const AccessibilityDemo: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '16px' }}>Modal Accessibility Features</h3>
          <ul style={{ color: '#666', fontSize: '14px', lineHeight: '1.5' }}>
            <li>Focus management with automatic focus trap</li>
            <li>Keyboard navigation (Escape to close, Tab to navigate)</li>
            <li>ARIA labels and descriptions for screen readers</li>
            <li>Backdrop click to close</li>
            <li>Proper semantic structure with compound components</li>
          </ul>
        </div>

        <Button onClick={() => setIsOpen(true)}>Test Accessibility Features</Button>

        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Modal.Header>
            <Modal.Title>Accessibility Test Modal</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <p>Try these accessibility features:</p>
            <ul>
              <li>Press Tab to navigate between focusable elements</li>
              <li>Press Escape to close the modal</li>
              <li>Click outside the modal to close it</li>
              <li>Use a screen reader to hear ARIA announcements</li>
            </ul>
            <FormField label="Test Input" hint="This field is properly labeled">
              <Input value="" onChange={() => {}} placeholder="Focus me with Tab" />
            </FormField>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Close Modal
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
};
