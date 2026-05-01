import express from 'express';
import { router as authRoute } from './routes/auth.route.js';

export const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/auth', authRoute);
