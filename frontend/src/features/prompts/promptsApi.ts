import axios from 'axios';
import { CreatePromptData, CreatePromptResponse, PromptsResponse } from './types';
import { config } from '../../config';

const API_URL = `${config.api.baseUrl}/api/prompts`;

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
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
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
