import { Router } from 'express';
import * as categoryController from './category.controller';

const router = Router();

// Routes for Categories
router.get('/', categoryController.getAllCategories);           // GET /api/categories
router.get('/:id', categoryController.getCategoryById);         // GET /api/categories/:id
router.post('/', categoryController.createCategory);            // POST /api/categories
router.put('/:id', categoryController.updateCategory);          // PUT /api/categories/:id
router.delete('/:id', categoryController.deleteCategory);       // DELETE /api/categories/:id

// Subcategories of a category
router.get('/:id/subcategories', categoryController.getCategorySubcategories); // GET /api/categories/:id/subcategories

export default router;
