export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
  userId?: string;
  context?: Record<string, any>;
}

export class ErrorHandler {
  private static errors: AppError[] = [];
  private static maxErrors = 100;

  static logError(error: AppError) {
    this.errors.unshift(error);
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(0, this.maxErrors);
    }

    // Log to console in development
    if (__DEV__) {
      console.error('App Error:', error);
    }

    // In production, you would send to error tracking service
    // this.sendToErrorService(error);
  }

  static createError(
    code: string,
    message: string,
    details?: any,
    userId?: string,
    context?: Record<string, any>
  ): AppError {
    return {
      code,
      message,
      details,
      timestamp: new Date(),
      userId,
      context,
    };
  }

  static handleAuthError(error: any, userId?: string): AppError {
    const appError = this.createError(
      'AUTH_ERROR',
      'Authentication failed',
      error,
      userId,
      { action: 'authentication' }
    );
    this.logError(appError);
    return appError;
  }

  static handleNetworkError(error: any, userId?: string): AppError {
    const appError = this.createError(
      'NETWORK_ERROR',
      'Network request failed',
      error,
      userId,
      { action: 'network_request' }
    );
    this.logError(appError);
    return appError;
  }

  static handleDatabaseError(error: any, userId?: string): AppError {
    const appError = this.createError(
      'DATABASE_ERROR',
      'Database operation failed',
      error,
      userId,
      { action: 'database_operation' }
    );
    this.logError(appError);
    return appError;
  }

  static handleValidationError(error: any, userId?: string): AppError {
    const appError = this.createError(
      'VALIDATION_ERROR',
      'Data validation failed',
      error,
      userId,
      { action: 'data_validation' }
    );
    this.logError(appError);
    return appError;
  }

  static getRecentErrors(count: number = 10): AppError[] {
    return this.errors.slice(0, count);
  }

  static clearErrors() {
    this.errors = [];
  }

  static getUserFriendlyMessage(error: AppError): string {
    switch (error.code) {
      case 'AUTH_ERROR':
        return 'Please check your login credentials and try again.';
      case 'NETWORK_ERROR':
        return 'Please check your internet connection and try again.';
      case 'DATABASE_ERROR':
        return 'We\'re experiencing technical difficulties. Please try again later.';
      case 'VALIDATION_ERROR':
        return 'Please check your input and try again.';
      default:
        return 'Something went wrong. Please try again.';
    }
  }
}

// Global error boundary hook
export function useErrorHandler() {
  const handleError = (error: any, context?: Record<string, any>) => {
    const appError = ErrorHandler.createError(
      'UNKNOWN_ERROR',
      error.message || 'An unexpected error occurred',
      error,
      undefined,
      context
    );
    ErrorHandler.logError(appError);
    return ErrorHandler.getUserFriendlyMessage(appError);
  };

  return { handleError };
}