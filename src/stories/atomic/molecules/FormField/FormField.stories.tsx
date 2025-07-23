import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormField } from "../../../../atomic/molecules/FormField/FormField";
import { Input } from "../../../../atomic/atoms/Input/Input";
import { Checkbox } from "../../../../atomic/atoms/Checkbox/Checkbox";
import { useState } from 'react';

const meta: Meta<typeof FormField> = {
  title: "Molecules/FormField",
  component: FormField,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormField label="Email">
        <Input 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          placeholder="Enter your email" 
        />
      </FormField>
    );
  },
};

export const Required: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormField label="Password" required>
        <Input 
          type="password"
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          placeholder="Enter your password" 
        />
      </FormField>
    );
  },
};

export const WithHint: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormField 
        label="Username" 
        hint="Choose a username between 3-20 characters"
      >
        <Input 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          placeholder="Enter your username" 
        />
      </FormField>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormField 
        label="Phone Number" 
        error="Please enter a valid phone number"
      >
        <Input 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          placeholder="Enter your phone number" 
        />
      </FormField>
    );
  },
};

export const WithCheckbox: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <FormField label="Preferences">
        <Checkbox 
          label="Subscribe to newsletter" 
          checked={checked}
          onChange={setChecked}
        />
      </FormField>
    );
  },
};

export const WithHtmlFor: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormField 
        label="Custom Field" 
        htmlFor="custom-input"
      >
        <Input 
          id="custom-input"
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          placeholder="This field has a custom ID" 
        />
      </FormField>
    );
  },
};
