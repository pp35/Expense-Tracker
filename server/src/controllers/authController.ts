import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User'; // Make sure this path is correct relative to your file location

// Your register function remains the same
export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({
      message: 'Error creating user',
      error
    });
  }
};

// Your login function remains the same
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email
      }
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign({
        id: user.id
      },
      process.env.JWT_SECRET!, {
        expiresIn: '1h'
      });
    res.json({
      token
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error logging in',
      error
    });
  }
};
