import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchBar } from "../../../../atomic/molecules/SearchBar/SearchBar";
import { useState } from 'react';

const meta: Meta<typeof SearchBar> = {
  title: "Molecules/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    const handleSearch = () => {
      alert(`Searching for: ${value}`);
    };

    return (
      <div style={{ width: '300px' }}>
        <SearchBar
          value={value}
          onChange={setValue}
          onSearch={handleSearch}
        />
      </div>
    );
  },
};

export const WithCustomPlaceholder: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const handleSearch = () => {
      alert(`Searching for: ${value}`);
    };

    return (
      <div style={{ width: '300px' }}>
        <SearchBar
          value={value}
          onChange={setValue}
          onSearch={handleSearch}
          placeholder="Type to search products..."
        />
      </div>
    );
  },
};

export const WithInitialValue: Story = {
  render: () => {
    const [value, setValue] = useState('initial search term');
    const handleSearch = () => {
      alert(`Searching for: ${value}`);
    };

    return (
      <div style={{ width: '300px' }}>
        <SearchBar
          value={value}
          onChange={setValue}
          onSearch={handleSearch}
        />
      </div>
    );
  },
};
