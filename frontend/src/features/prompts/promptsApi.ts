import axios from 'axios';
import { CreatePromptData, CreatePromptResponse, PromptsResponse } from './types';

const API_URL = 'http://localhost:5000/api/prompts';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('🔍 Token from localStorage:', token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('✅ Added Authorization header:', config.headers.Authorization);
  } else {
    console.log('❌ No token found in localStorage');
  }
  return config;
});

export const createPrompt = async (data: CreatePromptData): Promise<CreatePromptResponse> => {
  const response = await api.post('/', data);
  return response.data;
};

export const getUserPrompts = async (page: number = 1, limit: number = 10): Promise<PromptsResponse> => {
  const response = await api.get(`/my-prompts?page=${page}&limit=${limit}`);
  return response.data;
};

export const getPromptById = async (id: number) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

export const deletePrompt = async (id: number) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
