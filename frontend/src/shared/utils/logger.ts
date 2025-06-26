// Development-only logging utility

const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
  debug: (message: string, ...args: any[]) => {
    if (isDevelopment) {
      console.log(`🔍 ${message}`, ...args);
    }
  },
  
  info: (message: string, ...args: any[]) => {
    if (isDevelopment) {
      console.log(`ℹ️ ${message}`, ...args);
    }
  },
  
  success: (message: string, ...args: any[]) => {
    if (isDevelopment) {
      console.log(`✅ ${message}`, ...args);
    }
  },
  
  warning: (message: string, ...args: any[]) => {
    if (isDevelopment) {
      console.warn(`⚠️ ${message}`, ...args);
    }
  },
  
  error: (message: string, ...args: any[]) => {
    // Errors should be logged in production too for debugging
    console.error(`❌ ${message}`, ...args);
  },
  
  api: (message: string, ...args: any[]) => {
    if (isDevelopment) {
      console.log(`🚀 API: ${message}`, ...args);
    }
  },
  
  storage: (message: string, ...args: any[]) => {
    if (isDevelopment) {
      console.log(`💾 Storage: ${message}`, ...args);
    }
  }
};

export default logger;
