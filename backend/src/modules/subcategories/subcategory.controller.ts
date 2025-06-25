import { Request, Response } from 'express';
import * as subcategoryService from './subcategory.service';

// קבלת כל התת-קטגוריות
export const getAllSubcategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const subcategories = await subcategoryService.findAllSubcategories();
    res.json(subcategories);
  } catch (error) {
    console.error('Error getting all subcategories:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// קבלת תת-קטגוריה לפי ID
export const getSubcategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const subcategory = await subcategoryService.findSubcategoryById(+req.params.id);
    if (!subcategory) {
      res.status(404).json({ message: 'Subcategory not found' });
      return;
    }
    res.json(subcategory);
  } catch (error) {
    console.error('Error getting subcategory by id:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// יצירת תת-קטגוריה חדשה
export const createSubcategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, categoryId } = req.body;
    
    if (!name || !name.trim()) {
      res.status(400).json({ message: 'Subcategory name is required' });
      return;
    }

    if (!categoryId || isNaN(categoryId)) {
      res.status(400).json({ message: 'Valid category ID is required' });
      return;
    }

    const subcategory = await subcategoryService.createSubcategory({
      name: name.trim(),
      categoryId: +categoryId
    });
    
    res.status(201).json({
      message: 'Subcategory created successfully',
      subcategory
    });
  } catch (error) {
    console.error('Error creating subcategory:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// עדכון תת-קטגוריה
export const updateSubcategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, categoryId } = req.body;
    
    if (!name || !name.trim()) {
      res.status(400).json({ message: 'Subcategory name is required' });
      return;
    }

    const updateData: { name: string; categoryId?: number } = { name: name.trim() };
    
    if (categoryId && !isNaN(categoryId)) {
      updateData.categoryId = +categoryId;
    }

    const subcategory = await subcategoryService.updateSubcategory(+req.params.id, updateData);
    if (!subcategory) {
      res.status(404).json({ message: 'Subcategory not found' });
      return;
    }
    
    res.json({
      message: 'Subcategory updated successfully',
      subcategory
    });
  } catch (error) {
    console.error('Error updating subcategory:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// מחיקת תת-קטגוריה
export const deleteSubcategory = async (req: Request, res: Response): Promise<void> => {
  try {
    await subcategoryService.deleteSubcategory(+req.params.id);
    res.status(200).json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    console.error('Error deleting subcategory:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
