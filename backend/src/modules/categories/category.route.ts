import { Router } from 'express';
import * as categoryController from './category.controller';
import { authenticateToken, requireAdmin } from '../../utils/auth.middleware';

const router = Router();

// Public routes - categories can be viewed by all authenticated users
router.get('/', categoryController.getAllCategories);           // GET /api/categories
router.get('/:id', categoryController.getCategoryById);         // GET /api/categories/:id
router.get('/:id/subcategories', categoryController.getCategorySubcategories); // GET /api/categories/:id/subcategories

// Admin-only routes for category management
router.post('/', authenticateToken, requireAdmin, categoryController.createCategory);            // POST /api/categories
router.put('/:id', authenticateToken, requireAdmin, categoryController.updateCategory);          // PUT /api/categories/:id
router.delete('/:id', authenticateToken, requireAdmin, categoryController.deleteCategory);       // DELETE /api/categories/:id

export default router;
