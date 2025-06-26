// Custom Error Types for better error handling
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public field?: string) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 'AUTH_ERROR', 401);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 'AUTHORIZATION_ERROR', 403);
    this.name = 'AuthorizationError';
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'Network error occurred') {
    super(message, 'NETWORK_ERROR', 0);
    this.name = 'NetworkError';
  }
}

// Error Handler Utility
export const handleApiError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    // Check if it's an Axios error
    if ('response' in error && error.response) {
      const status = (error as any).response.status;
      const message = (error as any).response.data?.message || error.message;

      switch (status) {
        case 401:
          return new AuthenticationError(message);
        case 403:
          return new AuthorizationError(message);
        case 400:
          return new ValidationError(message);
        default:
          return new AppError(message, 'API_ERROR', status);
      }
    }

    return new NetworkError(error.message);
  }

  return new AppError('An unknown error occurred', 'UNKNOWN_ERROR');
};
