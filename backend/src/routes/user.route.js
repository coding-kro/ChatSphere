import { Router } from 'express';
import {
  getAllUsersController,
  getMeController,
} from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

export const router = Router();

router.get('/me', authMiddleware, getMeController);
router.get('/', authMiddleware, getAllUsersController);
