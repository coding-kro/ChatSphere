import { userModel } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/email.js';

export const registerUserController = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: 'please enter fullName, email and password',
      });
    }

    const isuserExist = await userModel.findOne({ email });

    if (isuserExist) {
      return res.status(400).json({
        message: 'user already exist',
       
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    setImmediate(async () => {
      try {
        await sendEmail(email, 'Welcome to chatSphere', fullName);
      } catch (error) {
        console.error('Error sending welcome email: ', error);
      }
    });

    return res.status(201).json({
      message: 'user created successfully',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error in registercontroller: ', error);
    return res.status(500).json({
      message: 'internal server error',
    });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'please enter email and password',
      });
    }

    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).json({
        message: 'invalid email or password',
      });
    }

    const isPasswordMatch = await bcryptjs.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: 'invalid email or password',
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.cookie('token', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, //7d
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });

    return res.status(200).json({
      message: 'login successful',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error('Error in login controller: ', error);
    return res.status(500).json({
      message: 'internal server error',
    });
  }
};

export const logoutUserController = (req, res) => {
  req.cookie('token', '', { maxAge: 0 });
  res.status(200).json({
    message: 'Logged out successfully',
  });
};
