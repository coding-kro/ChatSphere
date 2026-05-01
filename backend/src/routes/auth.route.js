import { Router } from 'express';
import { registerUserController } from '../controllers/auth.controller.js';

export const router = Router();

router.post('/register', registerUserController);
