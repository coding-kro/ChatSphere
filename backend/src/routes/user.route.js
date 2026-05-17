import { Router } from 'express';
import {
  getAllUsersController,
  getMeController,
  updateUserController,
  getAnotherUserController,
  searchUserController,
} from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import upload from '../config/multer.js';

export const router = Router();

router.get('/me', authMiddleware, getMeController);
router.get('/', authMiddleware, getAllUsersController);
router.put(
  '/updateprofile',
  authMiddleware,
  upload.single('image'),
  updateUserController,
);
router.get(
  '/seeprofile/:anotherUserId',
  authMiddleware,
  getAnotherUserController,
);
router.get('/search', authMiddleware, searchUserController);
