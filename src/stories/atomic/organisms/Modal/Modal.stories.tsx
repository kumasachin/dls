import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../../../../atomic/atoms/Button/Button';
import { Modal } from '../../../../atomic/organisms/Modal/Modal';

const meta: Meta<typeof Modal> = {
  title: 'Organisms/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '500px', width: '100%', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

export const Default: StoryObj<typeof Modal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Sample Modal"
          footer={<Button onClick={() => setIsOpen(false)}>Close</Button>}
        >
          <p>This is a sample modal dialog. Click outside or the close button to close it.</p>
          <p>You can put any content here, including forms, tables, or other components.</p>
        </Modal>
      </>
    );
  },
};

export const WithForm: StoryObj<typeof Modal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });

    const handleSubmit = () => {
      console.log('Form submitted:', formData);
      setIsOpen(false);
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)} variant="primary">
          Open Form Modal
        </Button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="User Information"
          footer={
            <>
              <Button onClick={() => setIsOpen(false)} variant="secondary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} variant="primary">
                Submit
              </Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ width: '100%', padding: '8px', marginTop: '4px' }}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ width: '100%', padding: '8px', marginTop: '4px' }}
              />
            </div>
          </div>
        </Modal>
      </>
    );
  },
};

export const LargeContent: StoryObj<typeof Modal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)} variant="primary">
          Open Large Content Modal
        </Button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Terms and Conditions"
          footer={
            <Button onClick={() => setIsOpen(false)} variant="primary">
              I Agree
            </Button>
          }
        >
          <div style={{ height: '400px', overflowY: 'auto' }}>
            <h3>1. Terms of Service</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <h3>2. Privacy Policy</h3>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>

            <h3>3. User Responsibilities</h3>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo.
            </p>

            <h3>4. Limitation of Liability</h3>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
              consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>

            <h3>5. Termination</h3>
            <p>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam
              aliquam quaerat voluptatem.
            </p>

            <h3>6. Governing Law</h3>
            <p>
              Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
              laboriosam, nisi ut aliquid ex ea commodi consequatur.
            </p>
          </div>
        </Modal>
      </>
    );
  },
};

export const WithoutHeader: StoryObj<typeof Modal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)} variant="primary">
          Open Modal Without Header
        </Button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          footer={
            <Button onClick={() => setIsOpen(false)} variant="primary">
              Close
            </Button>
          }
        >
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Custom Content</h2>
            <p>This modal doesn't have a title prop, so no header is rendered.</p>
            <p>The content area takes up the full space available.</p>
          </div>
        </Modal>
      </>
    );
  },
};
