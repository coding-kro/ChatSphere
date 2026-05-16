import { Router } from 'express';
import {
  loginUserController,
  logoutUserController,
  registerUserController,
} from '../controllers/auth.controller.js';

export const router = Router();

router.post('/register', registerUserController);
router.post('/login', loginUserController);
router.get('/logout', logoutUserController);
