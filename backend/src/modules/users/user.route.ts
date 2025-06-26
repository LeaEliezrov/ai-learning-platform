import express from 'express';
import { registerUser, loginUser, getAllUsers, getUserById, deleteUser, updateUser, getUserWithPrompts } from './user.controller';
import { authenticateToken, requireAdmin } from '../../utils/auth.middleware';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Admin-only routes
router.get('/', authenticateToken, requireAdmin, getAllUsers);
router.get('/:id', authenticateToken, requireAdmin, getUserById);
router.get('/:id/prompts', authenticateToken, requireAdmin, getUserWithPrompts);
router.delete('/:id', authenticateToken, requireAdmin, deleteUser);
router.patch('/:id', authenticateToken, requireAdmin, updateUser);

export default router;
