import { Router } from 'express';
import { PromptsController } from './prompt.controller';
import { authenticateToken, requireAdmin } from '../../utils/auth.middleware';

const router = Router();

// User routes - require authentication only
router.use(authenticateToken);

// יצירת prompt חדש
router.post('/', PromptsController.createPrompt);

// קבלת כל ה-prompts של המשתמש הנוכחי
router.get('/my-prompts', PromptsController.getUserPrompts);

// קבלת prompt מסוים לפי ID
router.get('/:id', PromptsController.getPromptById);

// מחיקת prompt
router.delete('/:id', PromptsController.deletePrompt);

// Admin routes - require both authentication AND admin status
router.get('/admin/all', requireAdmin, PromptsController.getAllPrompts);

export default router;
