import { Request, Response } from 'express';
import * as categoryService from './category.service';

// קבלת כל הקטגוריות
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await categoryService.findAllCategories();
    res.json(categories);
  } catch (error) {
    console.error('Error getting all categories:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// קבלת קטגוריה לפי ID
export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await categoryService.findCategoryById(+req.params.id);
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.json(category);
  } catch (error) {
    console.error('Error getting category by id:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// יצירת קטגוריה חדשה
export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    
    if (!name || !name.trim()) {
      res.status(400).json({ message: 'Category name is required' });
      return;
    }

    const category = await categoryService.createCategory({ name: name.trim() });
    res.status(201).json({
      message: 'Category created successfully',
      category
    });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// עדכון קטגוריה
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    
    if (!name || !name.trim()) {
      res.status(400).json({ message: 'Category name is required' });
      return;
    }

    const category = await categoryService.updateCategory(+req.params.id, { name: name.trim() });
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    
    res.json({
      message: 'Category updated successfully',
      category
    });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// מחיקת קטגוריה
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    await categoryService.deleteCategory(+req.params.id);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// קבלת תת-קטגוריות של קטגוריה
export const getCategorySubcategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const subcategories = await categoryService.findCategorySubcategories(+req.params.id);
    res.json(subcategories);
  } catch (error) {
    console.error('Error getting category subcategories:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
