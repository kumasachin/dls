import type React from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';

interface Props {
  children: ReactNode;
  componentName?: string;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ComponentErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { componentName = 'Unknown Component', onError } = this.props;

    // Log error for debugging (dev only)
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error(`Error in ${componentName}:`, error, errorInfo);
    }

    // Call custom error handler if provided
    if (onError) {
      onError(error, errorInfo);
    }

    // In production, you might want to send errors to a monitoring service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to error monitoring service
      // errorService.report(error, { component: componentName, errorInfo });
    }
  }

  override render() {
    if (this.state.hasError) {
      const { fallback } = this.props;

      if (fallback) {
        return fallback;
      }

      // Default fallback UI
      return (
        <div
          style={{
            padding: '16px',
            border: '1px solid var(--color-danger, #ef4444)',
            borderRadius: 'var(--radius-md, 8px)',
            backgroundColor: 'var(--color-danger-alpha-10, rgba(239, 68, 68, 0.1))',
            color: 'var(--color-danger, #ef4444)',
            fontFamily: 'var(--font-family-sans, system-ui)',
            fontSize: '14px',
          }}
          role="alert"
          aria-live="polite"
        >
          <strong>Something went wrong</strong>
          <p style={{ margin: '8px 0 0 0', fontSize: '12px', opacity: 0.8 }}>
            This component encountered an error.
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{ marginTop: '8px' }}>
                <summary style={{ cursor: 'pointer', fontSize: '11px' }}>
                  Show error details
                </summary>
                <pre
                  style={{
                    fontSize: '10px',
                    overflow: 'auto',
                    maxHeight: '100px',
                    margin: '4px 0 0 0',
                    padding: '4px',
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    borderRadius: '4px',
                  }}
                >
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Specialized error boundary for design system components
export const DesignSystemErrorBoundary: React.FC<{
  children: ReactNode;
  componentName: string;
}> = ({ children, componentName }) => (
  <ComponentErrorBoundary
    componentName={componentName}
    fallback={
      <div
        style={{
          padding: '12px',
          backgroundColor: 'var(--color-surface-2, #f8f9fa)',
          border: '1px dashed var(--color-border, #e5e7eb)',
          borderRadius: 'var(--radius-sm, 4px)',
          color: 'var(--color-text-secondary, #6b7280)',
          fontSize: '12px',
          textAlign: 'center',
          fontFamily: 'var(--font-family-sans, system-ui)',
        }}
      >
        {componentName} unavailable
      </div>
    }
  >
    {children}
  </ComponentErrorBoundary>
);

// Error boundary for Storybook stories
export const StorybookErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ComponentErrorBoundary
    componentName="Storybook Story"
    fallback={
      <div
        style={{
          padding: '20px',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          color: '#dc2626',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Story Error</h3>
        <p style={{ margin: 0, fontSize: '14px' }}>
          This story encountered an error and cannot be displayed.
        </p>
      </div>
    }
  >
    {children}
  </ComponentErrorBoundary>
);
