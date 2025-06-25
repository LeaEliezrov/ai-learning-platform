import { Router } from 'express';
import * as subcategoryController from './subcategory.controller';

const router = Router();

// Routes for Subcategories
router.get('/', subcategoryController.getAllSubcategories);         // GET /api/subcategories
router.get('/:id', subcategoryController.getSubcategoryById);       // GET /api/subcategories/:id
router.post('/', subcategoryController.createSubcategory);          // POST /api/subcategories
router.put('/:id', subcategoryController.updateSubcategory);        // PUT /api/subcategories/:id
router.delete('/:id', subcategoryController.deleteSubcategory);     // DELETE /api/subcategories/:id

export default router;