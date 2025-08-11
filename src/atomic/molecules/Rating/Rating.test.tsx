import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Rating } from './Rating';

describe('Rating', () => {
  it('renders with default props', () => {
    render(<Rating />);

    // Should render 5 stars by default
    const stars = screen.getAllByRole('button');
    expect(stars).toHaveLength(5);
  });

  it('renders correct number of stars based on max prop', () => {
    render(<Rating max={10} />);

    const stars = screen.getAllByRole('button');
    expect(stars).toHaveLength(10);
  });

  it('displays correct filled amount based on value', () => {
    render(<Rating value={3} max={5} />);

    // First 3 stars should be filled
    const star1 = screen.getByTestId('star-1');
    const star2 = screen.getByTestId('star-2');
    const star3 = screen.getByTestId('star-3');
    const star4 = screen.getByTestId('star-4');

    expect(star1).toHaveClass('star-full');
    expect(star2).toHaveClass('star-full');
    expect(star3).toHaveClass('star-full');
    expect(star4).toHaveClass('star-empty');
  });

  it('handles controlled value changes', () => {
    const handleChange = vi.fn();
    render(<Rating value={2} onChange={handleChange} />);

    const star4 = screen.getByTestId('star-4');
    fireEvent.click(star4);

    expect(handleChange).toHaveBeenCalledWith(4);
  });

  it('handles uncontrolled component with defaultValue', () => {
    const handleChange = vi.fn();
    render(<Rating defaultValue={1} onChange={handleChange} />);

    const star3 = screen.getByTestId('star-3');
    fireEvent.click(star3);

    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('supports half-star ratings when allowHalf is true', () => {
    const handleChange = vi.fn();
    render(<Rating allowHalf onChange={handleChange} />);

    const star2 = screen.getByTestId('star-2');

    // Mock getBoundingClientRect to return predictable values
    const mockGetBoundingClientRect = vi.fn(() => ({
      left: 0,
      top: 0,
      right: 100,
      bottom: 100,
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));
    star2.getBoundingClientRect = mockGetBoundingClientRect;

    // Click on left side for half star (25% from left = 25px from left edge)
    fireEvent.click(star2, {
      clientX: 25, // 25% of 100px width
    });

    expect(handleChange).toHaveBeenCalledWith(1.5);
  });

  it('prevents interaction when readOnly is true', () => {
    const handleChange = vi.fn();
    render(<Rating readOnly onChange={handleChange} />);

    const star3 = screen.getByTestId('star-3');
    fireEvent.click(star3);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('prevents interaction when disabled is true', () => {
    const handleChange = vi.fn();
    render(<Rating disabled onChange={handleChange} />);

    const star3 = screen.getByTestId('star-3');
    fireEvent.click(star3);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('supports clearing rating when allowClear is true', () => {
    const handleChange = vi.fn();
    render(<Rating value={3} allowClear onChange={handleChange} />);

    const star3 = screen.getByTestId('star-3');
    fireEvent.click(star3);

    expect(handleChange).toHaveBeenCalledWith(0);
  });

  it('handles hover effects', async () => {
    const handleHover = vi.fn();
    const handleHoverEnd = vi.fn();
    render(<Rating onHover={handleHover} onHoverEnd={handleHoverEnd} />);

    const star3 = screen.getByTestId('star-3');
    const ratingContainer = star3.closest('.rating-base');

    fireEvent.mouseOver(star3);
    expect(handleHover).toHaveBeenCalledWith(3);

    fireEvent.mouseLeave(ratingContainer!);
    expect(handleHoverEnd).toHaveBeenCalled();
  });

  it('displays value when showValue is true', () => {
    render(<Rating value={3} max={5} showValue />);

    expect(screen.getByText('3/5')).toBeInTheDocument();
  });

  it('uses custom formatValue function', () => {
    const formatValue = (value: number, max: number) => `${value} of ${max} stars`;
    render(<Rating value={4} max={5} showValue formatValue={formatValue} />);

    expect(screen.getByText('4 of 5 stars')).toBeInTheDocument();
  });

  it('shows tooltip when showTooltip is true and hovering', async () => {
    render(<Rating showTooltip />);

    const star3 = screen.getByTestId('star-3');
    fireEvent.mouseOver(star3);

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
      expect(screen.getByText('3/5')).toBeInTheDocument();
    });
  });

  it('uses custom tooltip content', async () => {
    const tooltipContent = (value: number) => `Rating: ${value} stars`;
    render(<Rating showTooltip tooltipContent={tooltipContent} />);

    const star4 = screen.getByTestId('star-4');
    fireEvent.mouseOver(star4);

    await waitFor(() => {
      expect(screen.getByText('Rating: 4 stars')).toBeInTheDocument();
    });
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Rating onChange={handleChange} />);

    await user.tab(); // Focus first star
    await user.keyboard('{Enter}');

    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it('applies different size variants', () => {
    const { container } = render(<Rating size="lg" />);

    expect(container.firstChild).toHaveClass('rating-lg');
  });

  it('applies different color variants', () => {
    const { container } = render(<Rating variant="primary" />);

    expect(container.firstChild).toHaveClass('rating-primary');
  });

  it('handles different max values (5, 10, 20)', () => {
    const { rerender } = render(<Rating max={5} />);
    expect(screen.getAllByRole('button')).toHaveLength(5);

    rerender(<Rating max={10} />);
    expect(screen.getAllByRole('button')).toHaveLength(10);

    rerender(<Rating max={20} />);
    expect(screen.getAllByRole('button')).toHaveLength(20);
  });

  it('has proper ARIA attributes', () => {
    render(<Rating value={3} max={5} />);

    const ratingGroup = screen.getByRole('radiogroup');
    expect(ratingGroup).toHaveAttribute('aria-label', 'Rating');
    expect(ratingGroup).toHaveAttribute('aria-valuemin', '0');
    expect(ratingGroup).toHaveAttribute('aria-valuemax', '5');
    expect(ratingGroup).toHaveAttribute('aria-valuenow', '3');
    expect(ratingGroup).toHaveAttribute('aria-valuetext', '3 out of 5 stars');
  });

  it('uses custom labels for ARIA valuetext', () => {
    const labels = ['Terrible', 'Bad', 'Okay', 'Good', 'Excellent'];
    render(<Rating value={4} labels={labels} />);

    const ratingGroup = screen.getByRole('radiogroup');
    expect(ratingGroup).toHaveAttribute('aria-valuetext', 'Good');
  });

  it('handles partial values correctly', () => {
    render(<Rating value={2.5} max={5} />);

    const star2 = screen.getByTestId('star-2');
    const star3 = screen.getByTestId('star-3');

    expect(star2).toHaveClass('star-full');
    expect(star3).toHaveClass('star-half');
  });

  it('maintains focus management for accessibility', async () => {
    const user = userEvent.setup();
    render(<Rating />);

    await user.tab();
    expect(screen.getByTestId('star-1')).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(screen.getByTestId('star-2')).toHaveFocus();
  });

  it('prevents default behavior on space and enter key', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Rating onChange={handleChange} />);

    const star2 = screen.getByTestId('star-2');
    star2.focus();

    await user.keyboard(' ');
    expect(handleChange).toHaveBeenCalledWith(2);

    await user.keyboard('{Enter}');
    expect(handleChange).toHaveBeenCalledWith(2);
  });
});
