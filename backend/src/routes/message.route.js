import { Router } from 'express';
import { sendMessageController } from '../controllers/message.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

export const router = Router();

router.post('/send', authMiddleware, sendMessageController);
