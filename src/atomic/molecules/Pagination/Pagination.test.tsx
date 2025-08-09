import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Pagination } from './Pagination';

describe('Pagination Component', () => {
  const mockOnPageChange = vi.fn();
  beforeEach(() => {
    mockOnPageChange.mockClear();
  });
  it('renders pagination buttons correctly', () => {
    render(<Pagination currentPage={5} totalPages={10} onPageChange={mockOnPageChange} />);
    expect(screen.getByLabelText('Go to first page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to next page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to last page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to page 5')).toBeInTheDocument();
  });
  it('highlights current page', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />);
    const currentPageButton = screen.getByLabelText('Go to page 3');
    expect(currentPageButton).toHaveAttribute('aria-current', 'page');
  });
  it('handles page clicks', async () => {
    const user = userEvent.setup();
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />);
    const page4Button = screen.getByLabelText('Go to page 4');
    await user.click(page4Button);
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });
  it('handles first page click', async () => {
    const user = userEvent.setup();
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />);
    const firstPageButton = screen.getByLabelText('Go to first page');
    await user.click(firstPageButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });
  it('handles last page click', async () => {
    const user = userEvent.setup();
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />);
    const lastPageButton = screen.getByLabelText('Go to last page');
    await user.click(lastPageButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(5);
  });
  it('disables first and previous buttons on first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);
    expect(screen.getByLabelText('Go to first page')).toBeDisabled();
    expect(screen.getByLabelText('Go to previous page')).toBeDisabled();
  });
  it('disables next and last buttons on last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={mockOnPageChange} />);
    expect(screen.getByLabelText('Go to next page')).toBeDisabled();
    expect(screen.getByLabelText('Go to last page')).toBeDisabled();
  });
  it('shows ellipsis for many pages', () => {
    render(
      <Pagination
        currentPage={10}
        totalPages={20}
        onPageChange={mockOnPageChange}
        maxVisiblePages={5}
      />
    );
    expect(screen.getAllByText('...')).toHaveLength(2);
  });
  it('disables all buttons when disabled prop is true', () => {
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} disabled={true} />
    );
    expect(screen.getByLabelText('Go to first page')).toBeDisabled();
    expect(screen.getByLabelText('Go to previous page')).toBeDisabled();
    expect(screen.getByLabelText('Go to next page')).toBeDisabled();
    expect(screen.getByLabelText('Go to last page')).toBeDisabled();
  });
  it('hides first/last buttons when showFirstLast is false', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
        showFirstLast={false}
      />
    );
    expect(screen.queryByLabelText('Go to first page')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Go to last page')).not.toBeInTheDocument();
  });
  it('hides prev/next buttons when showPrevNext is false', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
        showPrevNext={false}
      />
    );
    expect(screen.queryByLabelText('Go to previous page')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Go to next page')).not.toBeInTheDocument();
  });
});
