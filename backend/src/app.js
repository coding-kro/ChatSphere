import express from 'express';

export const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});
