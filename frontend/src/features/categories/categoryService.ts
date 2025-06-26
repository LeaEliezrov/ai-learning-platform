import axios from 'axios';
import { Category, Subcategory, CreateCategoryData, UpdateCategoryData, CreateSubcategoryData, UpdateSubcategoryData } from './types';
import { config } from '../../config';

const API_BASE_URL = `${config.api.baseUrl}/api`;

export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  },

  getById: async (id: number): Promise<Category> => {
    const response = await axios.get(`${API_BASE_URL}/categories/${id}`);
    return response.data;
  },

  create: async (data: CreateCategoryData): Promise<Category> => {
    const response = await axios.post(`${API_BASE_URL}/categories`, data);
    return response.data.category;
  },

  update: async (id: number, data: UpdateCategoryData): Promise<Category> => {
    const response = await axios.put(`${API_BASE_URL}/categories/${id}`, data);
    return response.data.category;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/categories/${id}`);
  },

  getSubcategories: async (categoryId: number): Promise<Subcategory[]> => {
    const response = await axios.get(`${API_BASE_URL}/categories/${categoryId}/subcategories`);
    return response.data;
  },
};

export const subcategoryService = {
  getAll: async (): Promise<Subcategory[]> => {
    const response = await axios.get(`${API_BASE_URL}/subcategories`);
    return response.data;
  },

  getById: async (id: number): Promise<Subcategory> => {
    const response = await axios.get(`${API_BASE_URL}/subcategories/${id}`);
    return response.data;
  },

  create: async (data: CreateSubcategoryData): Promise<Subcategory> => {
    const response = await axios.post(`${API_BASE_URL}/subcategories`, data);
    return response.data.subcategory;
  },

  update: async (id: number, data: UpdateSubcategoryData): Promise<Subcategory> => {
    const response = await axios.put(`${API_BASE_URL}/subcategories/${id}`, data);
    return response.data.subcategory;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/subcategories/${id}`);
  },
};
