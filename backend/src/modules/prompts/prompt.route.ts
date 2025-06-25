import { Router } from 'express';
import { PromptsController } from './prompt.controller';
import { authenticateToken } from '../../utils/auth.middleware';

const router = Router();

// כל ה-routes האלה דורשים authentication
router.use(authenticateToken);

// יצירת prompt חדש
router.post('/', PromptsController.createPrompt);

// קבלת כל ה-prompts של המשתמש הנוכחי
router.get('/my-prompts', PromptsController.getUserPrompts);

// קבלת prompt מסוים לפי ID
router.get('/:id', PromptsController.getPromptById);

// מחיקת prompt
router.delete('/:id', PromptsController.deletePrompt);

// Admin routes (לעתיד - נצטרך להוסיף admin middleware)
router.get('/admin/all', PromptsController.getAllPrompts);

export default router;
