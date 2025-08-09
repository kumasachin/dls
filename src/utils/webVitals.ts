import { type Metric, onCLS, onFCP, onLCP, onTTFB } from 'web-vitals';

// Simple performance tracking for the design system
class PerformanceTracker {
  private static instance: PerformanceTracker;
  private isInitialized = false;

  static getInstance(): PerformanceTracker {
    if (!PerformanceTracker.instance) {
      PerformanceTracker.instance = new PerformanceTracker();
    }
    return PerformanceTracker.instance;
  }

  initialize() {
    if (this.isInitialized) return;

    // Track core web vitals
    onCLS(this.logMetric);
    onFCP(this.logMetric);
    onLCP(this.logMetric);
    onTTFB(this.logMetric);

    this.isInitialized = true;
  }

  private logMetric = (metric: Metric) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(`${metric.name}: ${metric.value}`);
    }

    // In production, you might want to send to analytics
    // analytics.track(metric.name, metric.value);
  };

  // Track component render performance
  measureComponent(name: string, startTime: number) {
    const duration = performance.now() - startTime;
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(`Component ${name} rendered in ${duration.toFixed(2)}ms`);
    }
    return duration;
  }
}

export const webVitals = PerformanceTracker.getInstance();
