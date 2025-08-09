import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge Component', () => {
  it('renders with text content', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });
  it('applies variant styles', () => {
    const { rerender } = render(<Badge variant="success">Success</Badge>);
    let badgeElement = screen.getByText('Success');
    expect(badgeElement).toHaveStyle({ background: '#28a745' });
    rerender(<Badge variant="error">Error</Badge>);
    badgeElement = screen.getByText('Error');
    expect(badgeElement).toHaveStyle({ background: '#dc3545' });
    rerender(<Badge variant="warning">Warning</Badge>);
    badgeElement = screen.getByText('Warning');
    expect(badgeElement).toHaveStyle({ background: '#ffc107' });
  });
  it('applies primary variant by default', () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText('Default')).toHaveStyle({ background: '#007bff' });
  });
  it('applies size styles', () => {
    const { rerender } = render(<Badge size="small">Small</Badge>);
    let badgeElement = screen.getByText('Small');
    expect(badgeElement).toHaveStyle({ fontSize: '10px' });
    rerender(<Badge size="large">Large</Badge>);
    badgeElement = screen.getByText('Large');
    expect(badgeElement).toHaveStyle({ fontSize: '14px' });
  });
  it('applies medium size by default', () => {
    render(<Badge>Medium</Badge>);
    expect(screen.getByText('Medium')).toHaveStyle({ fontSize: '12px' });
  });
});
