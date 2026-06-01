import { Server } from 'socket.io';

const onlineUsers = new Map();
// userId -> Set(socketIds)

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CHATSPHERE_URL || 'http://localhost:5173',
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    /**
     * JOIN USER
     */
    socket.on('join', (userId) => {
      if (!userId) return;

      socket.userId = userId;

      if (!onlineUsers.has(userId)) {
        onlineUsers.set(userId, new Set());
      }

      onlineUsers.get(userId).add(socket.id);

      io.emit('online-users', Array.from(onlineUsers.keys()));
    });

    /**
     * TYPING EVENT
     */
    socket.on('typing', ({ receiverId, senderId }) => {
      const sender = senderId || socket.userId;

      if (!receiverId) return;

      const receiverSockets = onlineUsers.get(receiverId);

      if (!receiverSockets) return;

      for (const socketId of receiverSockets) {
        io.to(socketId).emit('userTyping', {
          senderId: sender,
        });
      }
    });

    /**
     * STOP TYPING EVENT
     */
    socket.on('stopTyping', ({ receiverId, senderId }) => {
      const sender = senderId || socket.userId;

      if (!receiverId) return;

      const receiverSockets = onlineUsers.get(receiverId);
      if (!receiverSockets) return;

      for (const socketId of receiverSockets) {
        io.to(socketId).emit('userStopTyping', {
          senderId: sender,
        });
      }
    });

    /**
     * DISCONNECT
     */
    socket.on('disconnect', () => {
      const userId = socket.userId;
      if (!userId) return;

      const sockets = onlineUsers.get(userId);

      if (sockets) {
        sockets.delete(socket.id);

        if (sockets.size === 0) {
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
