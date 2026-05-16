import mongoose from 'mongoose';
import { messageModel } from '../models/message.model.js';
import cloudinary from '../config/cloudinary.js';
/**
 * Send Message Controller
 */
export const sendMessageController = async (req, res) => {
  try {
    // Ideally from auth middleware
    const senderId = req.user?.userId;
    const { receiverId } = req.params;

    const message = req.body.message?.trim();
    let imageUrl = '';

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: 'chat_sphere',
        resource_type: 'image',
      });

      imageUrl = uploadResult.secure_url;
    }
    
    // Validate IDs
    if (!senderId || !receiverId) {
      return res.status(400).json({
        success: false,
        message: 'Sender and receiver IDs are required',
      });
    }

    // Validate MongoDB ObjectIds
    if (
      !mongoose.Types.ObjectId.isValid(senderId) ||
      !mongoose.Types.ObjectId.isValid(receiverId)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Invalid sender or receiver ID',
      });
    }

    // Prevent self messaging
    if (senderId === receiverId) {
      return res.status(400).json({
        success: false,
        message: 'You cannot send messages to yourself',
      });
    }

    // Validate content
    if (!message && !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Either message text or image is required',
      });
    }

    // Create message
    const newMessage = await messageModel.create({
      senderId,
      receiverId,
      message,
      image: imageUrl,
      seen: false,
    });

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
 * Get Messages Controller
 */
export const getMessagesController = async (req, res) => {
  try {
    // Ideally from auth middleware
    const userId = req.user?.userId;
    const { selectedUserId } = req.params;

    // Validate required fields
    if (!userId || !selectedUserId) {
      return res.status(400).json({
        success: false,
        message: 'userId and selectedUserId are required',
      });
    }

    // Validate MongoDB ObjectIds
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(selectedUserId)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Invalid userId or selectedUserId',
      });
    }

    // Fetch chat messages between two users
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
      .sort({ createdAt: 1 }) // Sort by creation time
      .lean();

    return res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error('Get Messages Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
