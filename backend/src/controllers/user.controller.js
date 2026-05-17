import jwt from 'jsonwebtoken';
import { userModel } from '../models/user.model.js';
import cloudinary from '../config/cloudinary.js';
import mongoose from 'mongoose';

export const getMeController = async (req, res) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    const userId = decoded.userId;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    res.json({
      message: 'User information retrieved successfully',
      user,
    });
  } catch (error) {
    console.error('Error in getMeController:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const loggedInUserId = req.user.userId;

    const users = await userModel.find({
      _id: { $ne: loggedInUserId },
    });

    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      users,
    });
  } catch (error) {
    console.error('Error in getAllUsersController:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const { fullName, email } = req.body;

    const userId = req.user.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'UserId not found',
      });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: 'chat_sphere',
        resource_type: 'image',
      });
      userData.profilePic = uploadResult.secure_url;
    }

    if (fullName) userData.fullName = fullName;

    if (email) {
      const normalizedEmail = email.toLowerCase().trim();

      const emailExists = await userModel.findOne({
        email: normalizedEmail,
        _id: { $ne: userId },
      });

      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use',
        });
      }

      userData.email = normalizedEmail;
    }

    await userData.save();

    return res.status(200).json({
      success: true,
      message: 'User profile updated successfully',
      userData,
    });
  } catch (error) {
    console.error('Error in updateUserController: ', error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const getAnotherUserController = async (req, res) => {
  try {
    const { anotherUserId } = req.params;

    if (!anotherUserId) {
      return res.status(400).json({
        success: false,
        message: 'Another user id not found',
      });
    }

    if (!mongoose.Types.ObjectId.isValid(anotherUserId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user id',
      });
    }

    const user = await userModel.findById(anotherUserId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Another user found',
      user,
    });
  } catch (error) {
    console.error('Error on getAnotherUserController: ', error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const searchUserController = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Query parameter "q" is required',
      });
    }

    const users = await userModel.find({
      fullName: { $regex: q, $options: 'i' },
    });

    return res.status(200).json({
      success: true,
      message: users.length ? 'Users found' : 'No users found',
      users,
    });
  } catch (error) {
    console.error('Error on searchUserController: ', error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
