// Application Configuration
export const config = {
  // API Configuration
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000',
    timeout: 10000, // 10 seconds
    retries: 3
  },

  // Authentication Configuration
  auth: {
    tokenKey: 'token',
    userKey: 'user',
    tokenExpiry: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  },

  // UI Configuration
  ui: {
    theme: {
      mode: 'light' as 'light' | 'dark',
      primaryColor: '#1976d2',
      secondaryColor: '#dc004e'
    },
    notifications: {
      duration: 5000,
      position: { vertical: 'top' as const, horizontal: 'right' as const }
    },
    pagination: {
      defaultPageSize: 10,
      pageSizeOptions: [5, 10, 25, 50]
    }
  },

  // Feature Flags
  features: {
    darkMode: true,
    advancedSearch: true,
    analytics: true,
    exportData: false,
    realTimeUpdates: false
  },

  // Validation Configuration
  validation: {
    minPasswordLength: 8,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif'],
    phoneNumberCountry: 'IL'
  },

  // AI Configuration
  ai: {
    maxPromptLength: 1000,
    minPromptLength: 10,
    defaultModel: 'gpt-3.5-turbo',
    responseTimeout: 30000 // 30 seconds
  },

  // Development flags
  dev: {
    enableLogging: process.env.NODE_ENV === 'development',
    enableReduxDevtools: process.env.NODE_ENV === 'development',
    mockAPI: false
  }
};

// Environment-specific overrides
if (process.env.NODE_ENV === 'production') {
  config.dev.enableLogging = false;
  config.dev.enableReduxDevtools = false;
}

// Utility functions
export const isFeatureEnabled = (feature: keyof typeof config.features): boolean => {
  return config.features[feature];
};

export const getApiUrl = (endpoint: string): string => {
  return `${config.api.baseUrl}/api${endpoint}`;
};

export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === 'development';
};

export const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production';
};
