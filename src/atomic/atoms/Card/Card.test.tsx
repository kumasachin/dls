import { render, screen } from '@testing-library/react';
import { Card } from './Card';
describe('Card Component', () => {
  it('renders children content', () => {
    render(
      <Card>
        <div>Card content</div>
      </Card>
    );
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });
  it('applies custom styles', () => {
    render(
      <Card style={{ backgroundColor: 'rgb(173, 216, 230)' }} data-testid="custom-card">
        <div>Styled card</div>
      </Card>
    );
    const cardElement = screen.getByTestId('custom-card');
    expect(cardElement).toHaveStyle({
      'background-color': 'rgb(173, 216, 230)',
    });
  });
  it('passes through additional props', () => {
    render(
      <Card data-testid="custom-card" className="custom-class">
        <div>Test content</div>
      </Card>
    );
    const cardElement = screen.getByTestId('custom-card');
    expect(cardElement).toHaveClass('custom-class');
  });
});
