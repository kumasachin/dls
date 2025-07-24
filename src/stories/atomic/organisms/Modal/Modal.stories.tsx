import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal } from '../../../../atomic/organisms/Modal/Modal';
import { Button } from '../../../../atomic/atoms/Button/Button';
import { Input } from '../../../../atomic/atoms/Input/Input';
import { FormField } from '../../../../atomic/molecules/FormField/FormField';
import { useState } from 'react';

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
        <Button label="Open Modal" onClick={() => setIsOpen(true)} primary />

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Sample Modal"
          footer={<Button label="Close" onClick={() => setIsOpen(false)} primary />}
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
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
      alert(`Submitted: ${name}, ${email}`);
      setIsOpen(false);
    };

    return (
      <>
        <Button label="Open Form Modal" onClick={() => setIsOpen(true)} primary />

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Contact Form"
          footer={
            <>
              <Button
                label="Cancel"
                onClick={() => setIsOpen(false)}
                primary={false}
                backgroundColor="#f5f5f5"
              />
              <Button label="Submit" onClick={handleSubmit} primary />
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <FormField label="Name" required>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </FormField>

            <FormField label="Email" required>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                type="email"
              />
            </FormField>
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
        <Button label="Open Large Content Modal" onClick={() => setIsOpen(true)} primary />

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Terms and Conditions"
          width="700px"
          footer={<Button label="I Agree" onClick={() => setIsOpen(false)} primary />}
        >
          <div style={{ height: '400px' }}>
            <h3>Terms of Service</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
              aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
            </p>
            <p>
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
            </p>
            <p>
              Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris
              placerat eleifend leo.
            </p>
            <h3>Privacy Policy</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
              aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
            </p>
            <p>
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
            </p>
            <p>
              Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris
              placerat eleifend leo.
            </p>
            <h3>Copyright Notice</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
              aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
            </p>
            <p>
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
            </p>
            <p>
              Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris
              placerat eleifend leo.
            </p>
          </div>
        </Modal>
      </>
    );
  },
};

export const NoHeader: StoryObj<typeof Modal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button label="Open Modal Without Header" onClick={() => setIsOpen(true)} primary />

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          footer={<Button label="Close" onClick={() => setIsOpen(false)} primary />}
        >
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <h2>Alert</h2>
            <p>This modal doesn't have a header with a title.</p>
            <p>This can be useful for simple alerts or notifications.</p>
          </div>
        </Modal>
      </>
    );
  },
};
