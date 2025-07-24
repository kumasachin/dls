import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from '../../../../atomic/organisms/Table/Table';
import { Tag } from '../../../../atomic/atoms/Tag/Tag';
import { useState } from 'react';

const meta: Meta<typeof Table> = {
  title: 'Organisms/Table',
  component: Table,
  tags: ['autodocs'],
};
export default meta;

// Sample data for the table
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
}

const users: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'inactive' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'pending' },
  {
    id: '5',
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    role: 'Viewer',
    status: 'active',
  },
];

export const Default: StoryObj<typeof Table> = {
  render: () => {
    return (
      <Table<User>
        columns={[
          { id: 'name', header: 'Name', accessor: (user) => user.name },
          { id: 'email', header: 'Email', accessor: (user) => user.email },
          { id: 'role', header: 'Role', accessor: (user) => user.role },
          {
            id: 'status',
            header: 'Status',
            accessor: (user) => {
              return (
                <Tag
                  label={user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  color={
                    user.status === 'active'
                      ? 'success'
                      : user.status === 'pending'
                        ? 'warning'
                        : 'default'
                  }
                />
              );
            },
            width: '120px',
          },
        ]}
        data={users}
        keyExtractor={(user) => user.id}
      />
    );
  },
};

export const WithRowSelection: StoryObj<typeof Table> = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string | undefined>();

    return (
      <div>
        <Table<User>
          columns={[
            { id: 'name', header: 'Name', accessor: (user) => user.name },
            { id: 'email', header: 'Email', accessor: (user) => user.email },
            { id: 'role', header: 'Role', accessor: (user) => user.role },
            {
              id: 'status',
              header: 'Status',
              accessor: (user) => {
                return (
                  <Tag
                    label={user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    color={
                      user.status === 'active'
                        ? 'success'
                        : user.status === 'pending'
                          ? 'warning'
                          : 'default'
                    }
                  />
                );
              },
            },
          ]}
          data={users}
          keyExtractor={(user) => user.id}
          onRowClick={(user) => setSelectedId(user.id)}
          selectedId={selectedId}
        />
        {selectedId && (
          <div
            style={{
              marginTop: '16px',
              padding: '16px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
            }}
          >
            Selected user: {users.find((user) => user.id === selectedId)?.name}
          </div>
        )}
      </div>
    );
  },
};

export const Empty: StoryObj<typeof Table> = {
  render: () => {
    return (
      <Table<User>
        columns={[
          { id: 'name', header: 'Name', accessor: (user) => user.name },
          { id: 'email', header: 'Email', accessor: (user) => user.email },
          { id: 'role', header: 'Role', accessor: (user) => user.role },
          { id: 'status', header: 'Status', accessor: (user) => user.status },
        ]}
        data={[]}
        keyExtractor={(user) => user.id}
        emptyMessage="No users found"
      />
    );
  },
};

export const Loading: StoryObj<typeof Table> = {
  render: () => {
    return (
      <Table<User>
        columns={[
          { id: 'name', header: 'Name', accessor: (user) => user.name },
          { id: 'email', header: 'Email', accessor: (user) => user.email },
          { id: 'role', header: 'Role', accessor: (user) => user.role },
          { id: 'status', header: 'Status', accessor: (user) => user.status },
        ]}
        data={[]}
        keyExtractor={(user) => user.id}
        isLoading={true}
      />
    );
  },
};
