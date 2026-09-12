import { Router } from 'express';
import { login, getMe, seedDefaultUsers, register, resetPassword } from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/reset-password', resetPassword);
router.get('/me', verifyToken, getMe);
router.post('/seed', seedDefaultUsers);

export default router;
