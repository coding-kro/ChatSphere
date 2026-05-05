import { Router } from 'express';
import { getMeController } from '../controllers/getMe.controller.js';

export const router = Router();

router.get('/me', getMeController);
