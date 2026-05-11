import mongoose from 'mongoose';
import { messageModel } from '../models/message.model.js';

export const sendMessageController = async (req, res) => {
  try {
    // Ideally from auth middleware
    const senderId = req.user?.userId;

    const { receiverId, message, image } = req.body;

    const trimmedMessage = message?.trim();
    const trimmedImage = image?.trim();

    // Validate IDs
    if (!senderId || !receiverId) {
      return res.status(400).json({
        success: false,
        error: 'Sender and receiver IDs are required',
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(senderId) ||
      !mongoose.Types.ObjectId.isValid(receiverId)
    ) {
      return res.status(400).json({
        success: false,
        error: 'Invalid sender or receiver ID',
      });
    }

    // Prevent self messaging
    if (senderId === receiverId) {
      return res.status(400).json({
        success: false,
        error: 'You cannot send messages to yourself',
      });
    }

    // Validate content
    if (!trimmedMessage && !trimmedImage) {
      return res.status(400).json({
        success: false,
        error: 'Either message text or image is required',
      });
    }

    // Create message
    const newMessage = await messageModel.create({
      senderId,
      receiverId,
      message: trimmedMessage,
      image: trimmedImage,
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
      error: 'Internal server error',
    });
  }
};
