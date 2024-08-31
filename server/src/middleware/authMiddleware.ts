import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Request interface to include the user property
interface AuthenticatedRequest extends Request {
  user?: string | object; // Adjust this type according to your JWT payload
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET environment variable is not set');
    }

    const decoded = jwt.verify(token, secret);
    req.user = decoded; // Type-safe assignment
    next();
  } catch (error) {
    // Check if error is an instance of Error and use its message, otherwise provide a generic message
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(401).json({ message: 'Invalid token', error: errorMessage });
  }
};
