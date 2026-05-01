import { Router } from 'express';
import {
  loginUserController,
  registerUserController,
} from '../controllers/auth.controller.js';

export const router = Router();

router.post('/register', registerUserController);
router.post('/login', loginUserController);
