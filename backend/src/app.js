import express from 'express';
import cookieParser from 'cookie-parser';
import { router as authRoute } from './routes/auth.route.js';
import { router as userRoute } from './routes/user.route.js';
import { router as messageRoute } from './routes/message.route.js';
import cors from 'cors';

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

// Test route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/message', messageRoute);
