import { Server } from 'socket.io';

const onlineUsers = new Map();

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ['http://localhost:5173', 'https://your-frontend.vercel.app'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('Connected:', socket.id);

    /**
     * USER JOIN
     */
    socket.on('join', (userId) => {
      console.log('JOIN EVENT:', userId);
      if (!userId) return;

      socket.userId = userId;

      if (!onlineUsers.has(userId)) {
        onlineUsers.set(userId, new Set());
      }

      onlineUsers.get(userId).add(socket.id);

      console.log('Online Users:', onlineUsers);

      io.emit('online-users', Array.from(onlineUsers.keys()));
    });

    /**
     * USER DISCONNECT
     */
    socket.on('disconnect', () => {
      console.log('Disconnected:', socket.id);

      const userId = socket.userId;

      if (!userId) return;

      const userSockets = onlineUsers.get(userId);

      if (userSockets) {
        userSockets.delete(socket.id);

        if (userSockets.size === 0) {
          onlineUsers.delete(userId);
        }
      }

      io.emit('online-users', Array.from(onlineUsers.keys()));
    });
  });

  return io;
};

export const getIO = () => io;

export { onlineUsers };
