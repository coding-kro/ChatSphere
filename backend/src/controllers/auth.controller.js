import { userModel } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const registerUserController = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'please enter name, email and password',
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
    name,
    email,
    password: hashedPassword,
  });

  return res.status(201).json({
    message: 'user created successfully',
  });
};
