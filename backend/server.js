import http from 'http';
import { app } from './src/app.js';
import { connectDB } from './src/db/db.js';
import { initSocket } from './src/socket/socket.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Connect DB FIRST (important)
    await connectDB();

    // Create HTTP server
    const server = http.createServer(app);

    // Initialize Socket.IO
    initSocket(server);

    // Start server
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    //Handle server errors
    server.on('error', (err) => {
      console.error('Server error:', err);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
