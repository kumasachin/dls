import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar Component', () => {
  it('renders with image when src is provided', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="User Avatar" />);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    expect(image).toHaveAttribute('alt', 'User Avatar');
  });
  it('renders initials when no src is provided', () => {
    render(<Avatar initials="JD" alt="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
  it('applies correct size styles', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="Avatar" size={60} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('width', '60');
    expect(image).toHaveAttribute('height', '60');
  });
  it('uses default size when not specified', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="Avatar" />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('width', '40');
    expect(image).toHaveAttribute('height', '40');
  });
  it('passes through additional props', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="Avatar" className="custom-avatar" />);
    const image = screen.getByRole('img');
    expect(image).toHaveClass('custom-avatar');
  });
  it('renders initials with correct styling', () => {
    render(<Avatar initials="AB" size={50} />);
    const initialsElement = screen.getByText('AB');
    expect(initialsElement).toHaveStyle({
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      fontSize: '25px',
    });
  });
});
