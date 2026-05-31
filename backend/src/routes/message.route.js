import { Router } from 'express';
import {
  sendMessageController,
  getMessagesController,
  markMessagesSeenController,
} from '../controllers/message.controller.js';

import { authMiddleware } from '../middleware/auth.middleware.js';
import upload from '../config/multer.js';

export const router = Router();

/**
 *  Send message (text + image)
 */
router.post(
  '/send/:receiverId',
  authMiddleware,
  upload.single('image'),
  sendMessageController,
);

/**
 * Get chat messages (with user)
 * GET /api/messages/:userId
 */
router.get(
  '/:selectedUserId',
  authMiddleware,
  getMessagesController,
);

/**
 *  Mark messages as seen
 */
router.put('/seen/:senderId', authMiddleware, markMessagesSeenController);
