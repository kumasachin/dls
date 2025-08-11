import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Image } from './Image';

describe('Image Component', () => {
  it('renders with required props', () => {
    render(<Image src="test.jpg" alt="Test image" />);

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'test.jpg');
    expect(img).toHaveAttribute('alt', 'Test image');
  });

  it('applies size variants correctly', () => {
    const { container } = render(<Image src="test.jpg" alt="Test image" size="lg" />);

    expect(container.firstChild).toHaveClass('image-lg');
  });

  it('applies variant styles correctly', () => {
    const { container } = render(<Image src="test.jpg" alt="Test image" variant="circle" />);

    expect(container.firstChild).toHaveClass('image-circle');
  });

  it('applies object fit correctly', () => {
    const { container } = render(<Image src="test.jpg" alt="Test image" objectFit="contain" />);

    expect(container.firstChild).toHaveClass('image-contain');
  });

  it('shows loading state initially', () => {
    const { container } = render(<Image src="test.jpg" alt="Test image" />);

    expect(container.firstChild).toHaveClass('image-loading');
    expect(screen.getByTestId('image-spinner')).toBeInTheDocument(); // Loading spinner
  });

  it('calls onLoad when image loads successfully', async () => {
    const handleLoad = vi.fn();
    render(<Image src="test.jpg" alt="Test image" onLoad={handleLoad} />);

    const img = screen.getByRole('img');
    fireEvent.load(img);

    await waitFor(() => {
      expect(handleLoad).toHaveBeenCalledTimes(1);
    });
  });

  it('falls back to fallbackSrc on error', async () => {
    const handleError = vi.fn();
    render(
      <Image src="invalid.jpg" fallbackSrc="fallback.jpg" alt="Test image" onError={handleError} />
    );

    const img = screen.getByRole('img');
    fireEvent.error(img);

    await waitFor(() => {
      expect(img).toHaveAttribute('src', 'fallback.jpg');
    });
  });

  it('shows placeholder when fallback also fails', async () => {
    const handleError = vi.fn();
    render(
      <Image
        src="invalid.jpg"
        fallbackSrc="invalid-fallback.jpg"
        alt="Test image"
        onError={handleError}
      />
    );

    const img = screen.getByRole('img');
    fireEvent.error(img);

    await waitFor(() => {
      fireEvent.error(img);
    });

    await waitFor(() => {
      expect(screen.getByRole('img', { name: 'Test image' })).toBeInTheDocument();
      expect(handleError).toHaveBeenCalled();
    });
  });

  it('applies custom aspect ratio', () => {
    const { container } = render(<Image src="test.jpg" alt="Test image" aspectRatio="16/9" />);

    expect(container.firstChild).toHaveStyle({ aspectRatio: '16/9' });
  });

  it('applies responsive class when responsive is true', () => {
    const { container } = render(<Image src="test.jpg" alt="Test image" responsive={true} />);

    expect(container.firstChild).toHaveClass('image-responsive');
  });

  it('forwards additional props to img element', () => {
    render(
      <Image src="test.jpg" alt="Test image" data-testid="custom-image" title="Custom title" />
    );

    const img = screen.getByTestId('custom-image');
    expect(img).toHaveAttribute('title', 'Custom title');
  });
});
