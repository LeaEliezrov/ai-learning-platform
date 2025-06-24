import express from 'express';
import { registerUser, loginUser, getAllUsers, getUserById, deleteUser, updateUser } from './user.controller';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);

export default router;
