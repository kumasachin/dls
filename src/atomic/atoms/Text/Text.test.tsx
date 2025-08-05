import { render, screen } from '@testing-library/react';
import { Text } from './Text';
describe('Text Component', () => {
  it('renders text content', () => {
    render(<Text>Hello World</Text>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
  it('applies custom styles', () => {
    render(<Text style={{ color: 'red', fontSize: '16px' }}>Styled text</Text>);
    const textElement = screen.getByText('Styled text');
    expect(textElement).toHaveStyle({
      color: 'rgb(255, 0, 0)',
      fontSize: '16px',
    });
  });
  it('renders with different HTML elements', () => {
    const { rerender } = render(<Text as="h1">Heading</Text>);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    rerender(<Text as="span">Span text</Text>);
    expect(screen.getByText('Span text').tagName).toBe('SPAN');
  });
  it('passes through additional props', () => {
    render(
      <Text data-testid="custom-text" className="custom-class">
        Test
      </Text>
    );
    const textElement = screen.getByTestId('custom-text');
    expect(textElement).toHaveClass('custom-class');
  });
});
