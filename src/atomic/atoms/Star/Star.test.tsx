import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Star } from './Star';

describe('Star Component', () => {
  describe('Basic rendering', () => {
    it('renders a star with default props', () => {
      render(<Star onRate={() => {}} />);
      const star = screen.getByRole('button');
      expect(star).toBeInTheDocument();
      expect(star).toHaveClass('star-base', 'star-md', 'star-default');
    });

    it('renders with custom size', () => {
      render(<Star size="lg" onRate={() => {}} />);
      const star = screen.getByRole('button');
      expect(star).toHaveClass('star-lg');
    });

    it('renders with custom variant', () => {
      render(<Star variant="primary" onRate={() => {}} />);
      const star = screen.getByRole('button');
      expect(star).toHaveClass('star-primary');
    });

    it('renders in static mode when interactive is false', () => {
      render(<Star interactive={false} />);
      const star = screen.getByRole('img');
      expect(star).toHaveClass('star-static');
    });
  });

  describe('Fill states', () => {
    it('renders empty star when filled is 0', () => {
      render(<Star filled={0} onRate={() => {}} />);
      const star = screen.getByRole('button');
      expect(star).toHaveClass('star-empty');
      expect(star).toHaveStyle({ '--star-fill-percentage': '0%' });
    });

    it('renders half star when filled is 0.5', () => {
      render(<Star filled={0.5} onRate={() => {}} />);
      const star = screen.getByRole('button');
      expect(star).toHaveClass('star-half');
      expect(star).toHaveStyle({ '--star-fill-percentage': '50%' });
    });

    it('renders full star when filled is 1', () => {
      render(<Star filled={1} onRate={() => {}} />);
      const star = screen.getByRole('button');
      expect(star).toHaveClass('star-full');
      expect(star).toHaveStyle({ '--star-fill-percentage': '100%' });
    });
  });

  describe('Interactions', () => {
    it('calls onRate when clicked', () => {
      const handleRate = vi.fn();
      render(<Star value={3} onRate={handleRate} />);

      const star = screen.getByRole('button');
      fireEvent.click(star);

      expect(handleRate).toHaveBeenCalledWith(3);
    });

    it('calls onRate when Enter key is pressed', () => {
      const handleRate = vi.fn();
      render(<Star value={4} onRate={handleRate} />);

      const star = screen.getByRole('button');
      fireEvent.keyDown(star, { key: 'Enter' });

      expect(handleRate).toHaveBeenCalledWith(4);
    });

    it('calls onRate when Space key is pressed', () => {
      const handleRate = vi.fn();
      render(<Star value={2} onRate={handleRate} />);

      const star = screen.getByRole('button');
      fireEvent.keyDown(star, { key: ' ' });

      expect(handleRate).toHaveBeenCalledWith(2);
    });

    it('does not call onRate when disabled', () => {
      const handleRate = vi.fn();
      render(<Star value={1} onRate={handleRate} disabled />);

      const star = screen.getByRole('img'); // Disabled stars have img role
      fireEvent.click(star);

      expect(handleRate).not.toHaveBeenCalled();
    });

    it('does not call onRate when not interactive', () => {
      const handleRate = vi.fn();
      render(<Star value={1} onRate={handleRate} interactive={false} />);

      const star = screen.getByRole('img');
      fireEvent.click(star);

      expect(handleRate).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has proper aria-label for empty star', () => {
      render(<Star filled={0} onRate={() => {}} />);
      const star = screen.getByRole('button');
      expect(star).toHaveAttribute('aria-label', 'Empty star');
    });

    it('has proper aria-label for half star', () => {
      render(<Star filled={0.5} onRate={() => {}} />);
      const star = screen.getByRole('button');
      expect(star).toHaveAttribute('aria-label', 'Half star');
    });

    it('has proper aria-label for full star', () => {
      render(<Star filled={1} onRate={() => {}} />);
      const star = screen.getByRole('button');
      expect(star).toHaveAttribute('aria-label', 'Full star');
    });

    it('accepts custom aria-label', () => {
      render(<Star aria-label="Custom star label" onRate={() => {}} />);
      const star = screen.getByRole('button');
      expect(star).toHaveAttribute('aria-label', 'Custom star label');
    });

    it('is focusable when interactive', () => {
      render(<Star onRate={() => {}} />);
      const star = screen.getByRole('button');
      expect(star).toHaveAttribute('tabIndex', '0');
    });

    it('is not focusable when not interactive', () => {
      render(<Star interactive={false} />);
      const star = screen.getByRole('img');
      expect(star).toHaveAttribute('tabIndex', '-1');
    });

    it('is not focusable when disabled', () => {
      render(<Star disabled onRate={() => {}} />);
      const star = screen.getByRole('img'); // When disabled, role changes to img
      expect(star).toHaveAttribute('tabIndex', '-1');
    });
  });
});
