import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Table } from './Table';

interface TestUser {
  id: string;
  name: string;
  email: string;
}
const mockColumns = [
  { id: 'name', header: 'Name', accessor: (user: TestUser) => user.name },
  { id: 'email', header: 'Email', accessor: (user: TestUser) => user.email },
];
const mockData: TestUser[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
];
describe('Table Component', () => {
  it('renders table headers', () => {
    render(<Table columns={mockColumns} data={mockData} keyExtractor={(user) => user.id} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });
  it('renders table data', () => {
    render(<Table columns={mockColumns} data={mockData} keyExtractor={(user) => user.id} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });
  it('handles row click events', async () => {
    const user = userEvent.setup();
    const mockRowClick = vi.fn();
    render(
      <Table
        columns={mockColumns}
        data={mockData}
        keyExtractor={(user) => user.id}
        onRowClick={mockRowClick}
      />
    );
    const firstRow = screen.getByText('John Doe').closest('tr');
    expect(firstRow).not.toBeNull();
    if (firstRow) {
      await user.click(firstRow);
      expect(mockRowClick).toHaveBeenCalledWith(mockData[0]);
    }
  });
  it('shows loading state', () => {
    const { container } = render(
      <Table columns={mockColumns} data={[]} keyExtractor={(user) => user.id} isLoading={true} />
    );
    // Look for the loading container div
    const loadingDiv = container.querySelector(
      'div[style*="display: flex"][style*="justify-content: center"]'
    );
    expect(loadingDiv).toBeInTheDocument();
  });
  it('shows empty message when no data', () => {
    render(
      <Table
        columns={mockColumns}
        data={[]}
        keyExtractor={(user) => user.id}
        emptyMessage="No users found"
      />
    );
    expect(screen.getByText('No users found')).toBeInTheDocument();
  });
});
