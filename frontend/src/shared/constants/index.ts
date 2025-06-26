// API Routes Constants
export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
  },
  USERS: {
    BASE: '/users',
    BY_ID: (id: number) => `/users/${id}`,
    PROFILE: '/users/profile',
  },
  CATEGORIES: {
    BASE: '/categories',
    BY_ID: (id: number) => `/categories/${id}`,
    SUBCATEGORIES: (id: number) => `/categories/${id}/subcategories`,
  },
  PROMPTS: {
    BASE: '/prompts',
    SUBMIT: '/prompts/submit',
    HISTORY: '/prompts/history',
  },
} as const;

// App Constants
export const APP_CONSTANTS = {
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
  },
  VALIDATION: {
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 50,
    PHONE_LENGTH: 10,
  },
  TIMEOUTS: {
    API_TIMEOUT: 10000,
    TOAST_DURATION: 5000,
  },
} as const;

// Status Constants
export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
} as const;

export type StatusType = typeof STATUS[keyof typeof STATUS];
