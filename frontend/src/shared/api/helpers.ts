// API helper functions
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

  // Generic CRUD operations class
  createCrudOperations: <T, CreateData, UpdateData>(endpoint: string) => {
    const { api } = require('./client');
    
    return {
      getAll: (): Promise<T[]> => api.get(`/${endpoint}`),
      
      getById: (id: number): Promise<T> => api.get(`/${endpoint}/${id}`),
      
      create: (data: CreateData): Promise<T> => 
        api.post(`/${endpoint}`, data).then((response: any) => {
          // Handle different response formats from backend
          return response[Object.keys(response)[0]] || response;
        }),
      
      update: (id: number, data: UpdateData): Promise<T> => 
        api.put(`/${endpoint}/${id}`, data).then((response: any) => {
          // Handle different response formats from backend
          return response[Object.keys(response)[0]] || response;
        }),
      
      delete: (id: number): Promise<void> => api.delete(`/${endpoint}/${id}`),
    };
  },

  // Validate required fields
  validateRequired: (value: any, fieldName: string): string | null => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return `${fieldName} is required`;
    }
    return null;
  },

  // Validate email format
  validateEmail: (email: string): string | null => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  // Validate phone number (Israeli format)
  validatePhone: (phone: string): string | null => {
    if (!phone) return 'Phone number is required';
    const phoneRegex = /^0[2-9]\d{7,8}$/;
    if (!phoneRegex.test(phone.replace(/[-\s]/g, ''))) {
      return 'Please enter a valid Israeli phone number';
    }
    return null;
  },

  // Debounce function
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
