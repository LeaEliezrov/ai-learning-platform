// User Types
export interface User {
  id: number;
  name: string;
  phone: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
  _count?: {
    prompts: number;
  };
}

export interface UserProfile {
  name: string;
  phone?: string;
  role?: 'USER' | 'ADMIN';
}

// Auth Types
export interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  phone: string;
  password: string;
}

export interface RegisterData {
  name: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

// API Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginationMeta {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

// Common UI Types
export interface ActionButton {
  label: string;
  onClick: () => void;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface LoadingState {
  loading: boolean;
  error: string | null;
}
