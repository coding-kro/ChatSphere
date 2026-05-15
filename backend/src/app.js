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
    origin: 'http://localhost:5173', // Adjust this to your frontend URL
    credentials: true, // Allow cookies to be sent with requests
  }),
);

// Health check route
app.get('/', (req, res) => {
  res.status(200).send('API is running');
});

// Routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/messages', messageRoute);
