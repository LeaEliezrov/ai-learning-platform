import axios from 'axios';
import { Category, Subcategory, CreateCategoryData, UpdateCategoryData, CreateSubcategoryData, UpdateSubcategoryData } from './types';
import { config } from '../../config';

const API_BASE_URL = `${config.api.baseUrl}/api`;

// Categories API
export const categoriesApi = {
  // קבלת כל הקטגוריות
  getAll: async (): Promise<Category[]> => {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  },

  // קבלת קטגוריה לפי ID
  getById: async (id: number): Promise<Category> => {
    const response = await axios.get(`${API_BASE_URL}/categories/${id}`);
    return response.data;
  },

  // יצירת קטגוריה חדשה
  create: async (data: CreateCategoryData): Promise<Category> => {
    const response = await axios.post(`${API_BASE_URL}/categories`, data);
    return response.data.category;
  },

  // עדכון קטגוריה
  update: async (id: number, data: UpdateCategoryData): Promise<Category> => {
    const response = await axios.put(`${API_BASE_URL}/categories/${id}`, data);
    return response.data.category;
  },

  // מחיקת קטגוריה
  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/categories/${id}`);
  },

  // קבלת תת-קטגוריות של קטגוריה
  getSubcategories: async (categoryId: number): Promise<Subcategory[]> => {
    const response = await axios.get(`${API_BASE_URL}/categories/${categoryId}/subcategories`);
    return response.data;
  },
};

// Subcategories API
export const subcategoriesApi = {
  // קבלת כל התת-קטגוריות
  getAll: async (): Promise<Subcategory[]> => {
    const response = await axios.get(`${API_BASE_URL}/subcategories`);
    return response.data;
  },

  // קבלת תת-קטגוריה לפי ID
  getById: async (id: number): Promise<Subcategory> => {
    const response = await axios.get(`${API_BASE_URL}/subcategories/${id}`);
    return response.data;
  },
  // יצירת תת-קטגוריה חדשה
  create: async (data: CreateSubcategoryData): Promise<Subcategory> => {
    const response = await axios.post(`${API_BASE_URL}/subcategories`, data);
    return response.data.subcategory;
  },
  // עדכון תת-קטגוריה
  update: async (id: number, data: UpdateSubcategoryData): Promise<Subcategory> => {
    const response = await axios.put(`${API_BASE_URL}/subcategories/${id}`, data);
    return response.data.subcategory;
  },
  // מחיקת תת-קטגוריה
  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/subcategories/${id}`);  },
};