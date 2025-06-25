export interface User {
  id: number;
  name: string;
  phone: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RegisterData {
  name: string;
  phone: string;
}

export interface LoginData {
  name: string;
  phone: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

export interface ApiError {
  message: string;
  status?: number;
}
