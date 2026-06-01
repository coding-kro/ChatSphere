import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { router as authRoute } from './routes/auth.route.js';
import { router as userRoute } from './routes/user.route.js';
import { router as messageRoute } from './routes/message.route.js';

export const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CHATSPHERE_URL || 'http://localhost:5173',
    credentials: true,
  }),
);

// Routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/messages', messageRoute);
