import { Platform } from 'react-native';

export interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: Date;
  context?: Record<string, any>;
}

export class PerformanceMonitor {
  private static metrics: PerformanceMetric[] = [];
  private static timers: Map<string, number> = new Map();

  static startTimer(name: string) {
    this.timers.set(name, Date.now());
  }

  static endTimer(name: string, context?: Record<string, any>) {
    const startTime = this.timers.get(name);
    if (startTime) {
      const duration = Date.now() - startTime;
      this.recordMetric(name, duration, context);
      this.timers.delete(name);
      return duration;
    }
    return 0;
  }

  static recordMetric(name: string, value: number, context?: Record<string, any>) {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: new Date(),
      context,
    };

    this.metrics.push(metric);

    // Keep only last 1000 metrics
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000);
    }

    // Log in development
    if (__DEV__) {
      console.log(`Performance: ${name} = ${value}ms`, context);
    }
  }

  static getMetrics(name?: string): PerformanceMetric[] {
    if (name) {
      return this.metrics.filter(m => m.name === name);
    }
    return this.metrics;
  }

  static getAverageMetric(name: string): number {
    const metrics = this.getMetrics(name);
    if (metrics.length === 0) return 0;
    
    const sum = metrics.reduce((acc, m) => acc + m.value, 0);
    return sum / metrics.length;
  }

  static clearMetrics() {
    this.metrics = [];
    this.timers.clear();
  }

  // Memory usage monitoring (web only)
  static getMemoryUsage(): Record<string, number> | null {
    if (Platform.OS === 'web' && 'memory' in performance) {
      const memory = (performance as any).memory;
      return {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit,
      };
    }
    return null;
  }

  // Network performance monitoring
  static measureNetworkRequest<T>(
    name: string,
    request: () => Promise<T>
  ): Promise<T> {
    this.startTimer(`network_${name}`);
    
    return request()
      .then(result => {
        this.endTimer(`network_${name}`, { success: true });
        return result;
      })
      .catch(error => {
        this.endTimer(`network_${name}`, { success: false, error: error.message });
        throw error;
      });
  }

  // Component render time monitoring
  static measureRender(componentName: string, renderFn: () => void) {
    this.startTimer(`render_${componentName}`);
    renderFn();
    this.endTimer(`render_${componentName}`);
  }
}

// React hook for performance monitoring
export function usePerformanceMonitor() {
  const measureAsync = async <T>(name: string, asyncFn: () => Promise<T>): Promise<T> => {
    PerformanceMonitor.startTimer(name);
    try {
      const result = await asyncFn();
      PerformanceMonitor.endTimer(name, { success: true });
      return result;
    } catch (error) {
      PerformanceMonitor.endTimer(name, { success: false });
      throw error;
    }
  };

  const measure = <T>(name: string, fn: () => T): T => {
    PerformanceMonitor.startTimer(name);
    try {
      const result = fn();
      PerformanceMonitor.endTimer(name, { success: true });
      return result;
    } catch (error) {
      PerformanceMonitor.endTimer(name, { success: false });
      throw error;
    }
  };

  return { measureAsync, measure };
}