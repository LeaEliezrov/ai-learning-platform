import axios from 'axios';
import { RegisterData, LoginData, AuthResponse } from './types';
import { config } from '../../config';

const API_URL = `${config.api.baseUrl}/api/users`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await api.post('/register', data);
    return response.data;
  } catch (error: any) {
    // החזרת הודעת השגיאה מהשרת
    throw new Error(error.response?.data?.message || 'שגיאת הרשמה');
  }
};

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const response = await api.post('/login', data);
    return response.data;
  } catch (error: any) {
    // החזרת הודעת השגיאה מהשרת
    throw new Error(error.response?.data?.message || 'שגיאת התחברות');
  }
};

export const getCurrentUser = async () => {
  const response = await api.get('/me');
  return response.data;
};
