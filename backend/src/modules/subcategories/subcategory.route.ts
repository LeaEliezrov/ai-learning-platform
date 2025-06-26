import { Router } from 'express';
import * as subcategoryController from './subcategory.controller';
import { authenticateToken, requireAdmin } from '../../utils/auth.middleware';

const router = Router();

// Public routes - subcategories can be viewed by all authenticated users
router.get('/', subcategoryController.getAllSubcategories);         // GET /api/subcategories
router.get('/:id', subcategoryController.getSubcategoryById);       // GET /api/subcategories/:id

// Admin-only routes for subcategory management
router.post('/', authenticateToken, requireAdmin, subcategoryController.createSubcategory);          // POST /api/subcategories
router.put('/:id', authenticateToken, requireAdmin, subcategoryController.updateSubcategory);        // PUT /api/subcategories/:id
router.delete('/:id', authenticateToken, requireAdmin, subcategoryController.deleteSubcategory);     // DELETE /api/subcategories/:id

export default router;