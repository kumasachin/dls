import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import React, { useState } from 'react';
import './Image.css';

const imageStyles = cva(['image-base'], {
  variants: {
    size: {
      xs: 'image-xs',
      sm: 'image-sm',
      md: 'image-md',
      lg: 'image-lg',
      xl: 'image-xl',
    },
    variant: {
      default: 'image-default',
      rounded: 'image-rounded',
      circle: 'image-circle',
      thumbnail: 'image-thumbnail',
    },
    objectFit: {
      cover: 'image-cover',
      contain: 'image-contain',
      fill: 'image-fill',
      none: 'image-none',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
    objectFit: 'cover',
  },
});

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'size'>,
    VariantProps<typeof imageStyles> {
  /** Alternative text for the image */
  alt: string;
  /** Source URL of the image */
  src: string;
  /** Fallback image URL if main src fails */
  fallbackSrc?: string;
  /** Whether to show a loading state */
  loading?: 'lazy' | 'eager';
  /** Whether the image should be responsive */
  responsive?: boolean;
  /** Custom aspect ratio */
  aspectRatio?: string;
  /** Callback when image loads successfully */
  onLoad?: () => void;
  /** Callback when image fails to load */
  onError?: () => void;
}

export const Image: React.FC<ImageProps> = ({
  alt,
  src,
  fallbackSrc,
  size,
  variant,
  objectFit,
  loading = 'lazy',
  responsive = true,
  aspectRatio,
  onLoad,
  onError,
  className,
  style,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);

    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
      setIsLoading(true);
    } else {
      onError?.();
    }
  };

  const combinedStyle = {
    ...style,
    ...(aspectRatio && { aspectRatio }),
  };

  return (
    <div
      className={clsx(
        imageStyles({ size, variant, objectFit }),
        responsive && 'image-responsive',
        isLoading && 'image-loading',
        hasError && 'image-error',
        className
      )}
      style={combinedStyle}
    >
      {!hasError ? (
        <img
          src={currentSrc}
          alt={alt}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          className="image-element"
          {...props}
        />
      ) : (
        <div className="image-placeholder" role="img" aria-label={alt}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="image-placeholder-icon"
          >
            <path
              d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z"
              fill="currentColor"
            />
          </svg>
        </div>
      )}

      {isLoading && (
        <div className="image-loading-overlay">
          <div className="image-spinner" data-testid="image-spinner" />
        </div>
      )}
    </div>
  );
};

Image.displayName = 'Image';
