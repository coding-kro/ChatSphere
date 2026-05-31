import mongoose from 'mongoose';
import { messageModel } from '../models/message.model.js';
import cloudinary from '../config/cloudinary.js';
import { getIO, onlineUsers } from '../socket/socket.js';

/**
 * 💬 SEND MESSAGE
 */
export const sendMessageController = async (req, res) => {
  try {
    const senderId = req.user?.userId;
    const { receiverId } = req.params;

    const message = req.body.message?.trim();
    let imageUrl = '';

    const io = getIO();

    /**
     * ✅ VALIDATION
     */
    if (!senderId || !receiverId) {
      return res.status(400).json({
        success: false,
        message: 'Sender and receiver IDs are required',
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(senderId) ||
      !mongoose.Types.ObjectId.isValid(receiverId)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Invalid sender or receiver ID',
      });
    }

    if (senderId.toString() === receiverId.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot send messages to yourself',
      });
    }

    /**
     * 📷 IMAGE UPLOAD
     */
    if (req.file) {
      try {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: 'chat_sphere',
          resource_type: 'image',
        });

        imageUrl = uploadResult.secure_url;
      } catch (error) {
        console.error('Cloudinary Error:', error);

        return res.status(500).json({
          success: false,
          message: 'Image upload failed',
        });
      }
    }

    /**
     * ❌ EMPTY MESSAGE CHECK
     */
    if (!message && !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Either message text or image is required',
      });
    }

    /**
     * 💾 SAVE MESSAGE
     */
    const newMessage = await messageModel.create({
      senderId,
      receiverId,
      message,
      image: imageUrl,
      seen: false,
    });

    console.log('Sender ID:', senderId.toString());
    console.log('Receiver ID:', receiverId.toString());

    /**
     * ⚡ GET SOCKETS
     */
    const receiverSockets = onlineUsers.get(receiverId.toString());

    const senderSockets = onlineUsers.get(senderId.toString());

    console.log('Receiver Sockets:', receiverSockets);
    console.log('Sender Sockets:', senderSockets);

    /**
     * 📤 SEND TO RECEIVER
     */
    if (io && receiverSockets?.size > 0) {
      receiverSockets.forEach((socketId) => {
        io.to(socketId).emit('receive-message', newMessage);

        console.log(`✅ Message sent to receiver socket: ${socketId}`);
      });
    } else {
      console.log('❌ Receiver not online');
    }

    /**
     * 📤 SEND TO SENDER
     */
    if (io && senderSockets?.size > 0) {
      senderSockets.forEach((socketId) => {
        io.to(socketId).emit('receive-message', newMessage);

        console.log(`✅ Message sent to sender socket: ${socketId}`);
      });
    }

    /**
     * ✅ RESPONSE
     */
    return res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: newMessage,
    });
  } catch (error) {
    console.error('Send Message Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * 📥 GET MESSAGES
 */
export const getMessagesController = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { selectedUserId } = req.params;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;

    const io = getIO();

    /**
     * ✅ VALIDATION
     */
    if (!userId || !selectedUserId) {
      return res.status(400).json({
        success: false,
        message: 'userId and selectedUserId are required',
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(selectedUserId)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Invalid userId or selectedUserId',
      });
    }

    /**
     * 📥 GET CHAT
     */
    const messages = await messageModel
      .find({
        $or: [
          {
            senderId: userId,
            receiverId: selectedUserId,
          },
          {
            senderId: selectedUserId,
            receiverId: userId,
          },
        ],
      })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    /**
     * 👁️ MARK AS SEEN
     */
    await messageModel.updateMany(
      {
        senderId: selectedUserId,
        receiverId: userId,
        seen: false,
      },
      {
        $set: {
          seen: true,
        },
      },
    );

    /**
     * ⚡ NOTIFY SENDER
     */
    const senderSockets = onlineUsers.get(selectedUserId.toString());

    if (io && senderSockets?.size > 0) {
      senderSockets.forEach((socketId) => {
        io.to(socketId).emit('messages-seen', {
          by: userId,
        });
      });
    }

    /**
     * ✅ RESPONSE
     */
    return res.status(200).json({
      success: true,
      count: messages.length,
      data: messages.reverse(),
    });
  } catch (error) {
    console.error('Get Messages Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * 👁️ MARK MESSAGES AS SEEN
 */
export const markMessagesSeenController = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { senderId } = req.params;

    const io = getIO();

    /**
     * ✅ VALIDATION
     */
    if (!userId || !senderId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request',
      });
    }

    /**
     * 👁️ UPDATE SEEN
     */
    await messageModel.updateMany(
      {
        senderId,
        receiverId: userId,
        seen: false,
      },
      {
        $set: {
          seen: true,
        },
      },
    );

    /**
     * ⚡ SOCKET NOTIFY
     */
    const senderSockets = onlineUsers.get(senderId.toString());

    if (io && senderSockets?.size > 0) {
      senderSockets.forEach((socketId) => {
        io.to(socketId).emit('messages-seen', {
          by: userId,
        });
      });
    }

    /**
     * ✅ RESPONSE
     */
    return res.status(200).json({
      success: true,
      message: 'Messages marked as seen',
    });
  } catch (error) {
    console.error('Seen Error:', error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
