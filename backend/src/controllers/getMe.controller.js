import jwt from 'jsonwebtoken';
import { userModel } from '../models/user.model.js';

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
