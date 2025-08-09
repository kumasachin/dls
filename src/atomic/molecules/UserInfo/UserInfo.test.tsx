import { render, screen } from '@testing-library/react';
import { UserInfo } from './UserInfo';

describe('UserInfo Component', () => {
  it('renders user name', () => {
    render(<UserInfo name="John Doe" />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
  it('renders with image when provided', () => {
    render(<UserInfo name="John Doe" imageUrl="https://example.com/avatar.jpg" />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    expect(image).toHaveAttribute('alt', 'John Doe');
  });
  it('renders subtitle when provided', () => {
    render(<UserInfo name="John Doe" subtitle="Software Engineer" />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });
  it('applies correct size styling', () => {
    const { rerender } = render(<UserInfo name="John Doe" size="sm" />);
    let avatar = screen.queryByRole('img');
    if (avatar) {
      expect(avatar).toHaveAttribute('width', '32');
    }
    rerender(<UserInfo name="John Doe" size="lg" />);
    avatar = screen.queryByRole('img');
    if (avatar) {
      expect(avatar).toHaveAttribute('width', '64');
    }
  });
  it('uses medium size by default', () => {
    render(<UserInfo name="John Doe" imageUrl="https://example.com/avatar.jpg" />);
    const avatar = screen.getByRole('img');
    expect(avatar).toHaveAttribute('width', '48');
  });
  it('renders without image when no imageUrl provided', () => {
    render(<UserInfo name="John Doe" />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
