import { Platform } from 'react-native';

export interface AccessibilityConfig {
  announceScreenChanges: boolean;
  reduceMotion: boolean;
  highContrast: boolean;
  largeText: boolean;
  voiceOverEnabled: boolean;
}

export class AccessibilityService {
  private static config: AccessibilityConfig = {
    announceScreenChanges: true,
    reduceMotion: false,
    highContrast: false,
    largeText: false,
    voiceOverEnabled: false,
  };

  static async initialize() {
    if (Platform.OS === 'web') {
      await this.detectWebAccessibilitySettings();
    }
  }

  private static async detectWebAccessibilitySettings() {
    if (typeof window === 'undefined') return;

    // Detect reduced motion preference
    if (window.matchMedia) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.config.reduceMotion = prefersReducedMotion.matches;

      // Listen for changes
      prefersReducedMotion.addEventListener('change', (e) => {
        this.config.reduceMotion = e.matches;
      });

      // Detect high contrast preference
      const prefersHighContrast = window.matchMedia('(prefers-contrast: high)');
      this.config.highContrast = prefersHighContrast.matches;

      prefersHighContrast.addEventListener('change', (e) => {
        this.config.highContrast = e.matches;
      });
    }
  }

  static getConfig(): AccessibilityConfig {
    return { ...this.config };
  }

  static updateConfig(updates: Partial<AccessibilityConfig>) {
    this.config = { ...this.config, ...updates };
  }

  static announceForScreenReader(message: string) {
    if (Platform.OS === 'web' && this.config.announceScreenChanges) {
      // Create a live region for screen reader announcements
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.style.position = 'absolute';
      announcement.style.left = '-10000px';
      announcement.style.width = '1px';
      announcement.style.height = '1px';
      announcement.style.overflow = 'hidden';
      
      document.body.appendChild(announcement);
      announcement.textContent = message;
      
      // Remove after announcement
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    }
  }

  static getAccessibilityProps(element: 'button' | 'link' | 'heading' | 'text' | 'image') {
    const baseProps: any = {};

    switch (element) {
      case 'button':
        return {
          ...baseProps,
          accessible: true,
          accessibilityRole: 'button',
        };
      case 'link':
        return {
          ...baseProps,
          accessible: true,
          accessibilityRole: 'link',
        };
      case 'heading':
        return {
          ...baseProps,
          accessible: true,
          accessibilityRole: 'header',
        };
      case 'text':
        return {
          ...baseProps,
          accessible: true,
          accessibilityRole: 'text',
        };
      case 'image':
        return {
          ...baseProps,
          accessible: true,
          accessibilityRole: 'image',
        };
      default:
        return baseProps;
    }
  }

  static getFocusableProps() {
    return {
      accessible: true,
      accessibilityRole: 'button' as const,
      focusable: true,
    };
  }

  static getAnimationDuration(defaultDuration: number): number {
    return this.config.reduceMotion ? 0 : defaultDuration;
  }

  static shouldReduceMotion(): boolean {
    return this.config.reduceMotion;
  }

  static shouldUseHighContrast(): boolean {
    return this.config.highContrast;
  }

  static getContrastColors() {
    if (this.config.highContrast) {
      return {
        background: '#000000',
        surface: '#1a1a1a',
        text: '#ffffff',
        primary: '#00ff00',
        secondary: '#ffff00',
        error: '#ff0000',
        warning: '#ff8800',
        success: '#00ff00',
      };
    }
    return null;
  }

  static getFontScale(): number {
    return this.config.largeText ? 1.2 : 1.0;
  }
}

// React hook for accessibility
export function useAccessibility() {
  const config = AccessibilityService.getConfig();

  const announce = (message: string) => {
    AccessibilityService.announceForScreenReader(message);
  };

  const getProps = (element: Parameters<typeof AccessibilityService.getAccessibilityProps>[0]) => {
    return AccessibilityService.getAccessibilityProps(element);
  };

  const getFocusableProps = () => {
    return AccessibilityService.getFocusableProps();
  };

  return {
    config,
    announce,
    getProps,
    getFocusableProps,
    shouldReduceMotion: config.reduceMotion,
    shouldUseHighContrast: config.highContrast,
    fontScale: AccessibilityService.getFontScale(),
  };
}