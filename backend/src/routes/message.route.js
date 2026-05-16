import { Router } from 'express';
import {
  sendMessageController,
  getMessagesController,
} from '../controllers/message.controller.js';

import { authMiddleware } from '../middleware/auth.middleware.js';
import upload from '../config/multer.js';

export const router = Router();

// Send message
router.post(
  '/send/:receiverId',
  authMiddleware,
  upload.single('image'),
  sendMessageController,
);

// Get conversation messages
router.get('/:selectedUserId', authMiddleware, getMessagesController);
