import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    message: {
      type: String,
      trim: true,
      default: '',
    },

    image: {
      type: String,
      default: null,
    },

    seen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// helpful index for chat queries
messageSchema.index({ senderId: 1, receiverId: 1, createdAt: -1 });

export const messageModel = mongoose.model('Message', messageSchema);
