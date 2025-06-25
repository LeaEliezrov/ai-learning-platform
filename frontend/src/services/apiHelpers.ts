import { apiMethods } from './api';

// Generic CRUD operations
export class CrudService<T, CreateData, UpdateData> {
  constructor(private endpoint: string) {}

  async getAll(): Promise<T[]> {
    return apiMethods.get<T[]>(`/${this.endpoint}`);
  }

  async getById(id: number): Promise<T> {
    return apiMethods.get<T>(`/${this.endpoint}/${id}`);
  }

  async create(data: CreateData): Promise<T> {
    const response = await apiMethods.post<{ [key: string]: T }>(`/${this.endpoint}`, data);
    // Handle different response formats from backend
    return response[Object.keys(response)[0]] || response as unknown as T;
  }

  async update(id: number, data: UpdateData): Promise<T> {
    const response = await apiMethods.put<{ [key: string]: T }>(`/${this.endpoint}/${id}`, data);
    // Handle different response formats from backend
    return response[Object.keys(response)[0]] || response as unknown as T;
  }

  async delete(id: number): Promise<void> {
    return apiMethods.delete<void>(`/${this.endpoint}/${id}`);
  }
}

// Utility functions for API operations
export const apiHelpers = {
  // Handle API errors consistently
  handleError: (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'An unexpected error occurred';
  },

  // Create error handler for async thunks
  createErrorHandler: (defaultMessage: string) => (error: unknown) => {
    return apiHelpers.handleError(error) || defaultMessage;
  },

  // Retry logic for failed requests
  withRetry: async <T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> => {
    let lastError: unknown;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        
        if (attempt === maxRetries) {
          throw error;
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }
    
    throw lastError;
  },

  // Debounce function for search operations
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },
};
