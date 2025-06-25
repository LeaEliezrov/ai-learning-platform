// API-related utility functions

export const apiUtils = {
  // Format error messages
  formatErrorMessage: (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    if (typeof error === 'object' && error !== null && 'message' in error) {
      return String((error as any).message);
    }
    return 'An unexpected error occurred';
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

  // Validate minimum length
  validateMinLength: (value: string, minLength: number, fieldName: string): string | null => {
    if (!value) return `${fieldName} is required`;
    if (value.length < minLength) {
      return `${fieldName} must be at least ${minLength} characters long`;
    }
    return null;
  },

  // Create query string from object
  createQueryString: (params: Record<string, any>): string => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, String(value));
      }
    });
    return searchParams.toString();
  },

  // Safe JSON parse
  safeJsonParse: <T>(json: string, fallback: T): T => {
    try {
      return JSON.parse(json) as T;
    } catch {
      return fallback;
    }
  },

  // Deep clone object
  deepClone: <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
  },

  // Check if value is empty
  isEmpty: (value: any): boolean => {
    if (value == null) return true;
    if (typeof value === 'string') return value.trim().length === 0;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
  },
};
