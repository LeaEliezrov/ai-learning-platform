import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwt';

// הרחבת interface של Request כדי לכלול user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        phone: string;
        role: 'USER' | 'ADMIN';
      };
    }
  }
}

export interface JWTPayload {
  id?: number;
  userId?: number; // תמיכה ב-payload ישן
  name: string;
  phone: string;
  role?: 'USER' | 'ADMIN';
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log('🔍 Debug Auth Middleware:');
  console.log('authHeader:', authHeader);
  console.log('token:', token);

  if (!token) {
    console.log('❌ No token provided');
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    console.log('🔐 JWT_SECRET:', JWT_SECRET.substring(0, 10) + '...');    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    console.log('✅ Token decoded successfully:', decoded);
    
    // תמיכה ב-payload ישן וחדש
    const userId = decoded.id || decoded.userId;
    if (!userId) {
      console.log('❌ No user ID found in token');
      return res.status(403).json({ error: 'Invalid token: missing user ID' });
    }      req.user = {
      id: userId.toString(),
      name: decoded.name,
      phone: decoded.phone,
      role: decoded.role || 'USER'
    };
    console.log('✅ req.user set:', req.user);
    next();} catch (error) {
    console.error('❌ Token verification failed:', error);
    
    if (error instanceof jwt.JsonWebTokenError) {
      console.error('JWT Error type:', error.name);
      console.error('JWT Error message:', error.message);
    }
    
    return res.status(403).json({ 
      error: 'Invalid or expired token',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Middleware אופציונלי - לא חובה לחבר משתמש
export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next();
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    const userId = decoded.id || decoded.userId;
    if (userId) {      req.user = {
        id: userId.toString(),
        name: decoded.name,
        phone: decoded.phone,
        role: decoded.role || 'USER'
      };
    }
  } catch (error) {
    console.error('Optional token verification failed:', error);
  }
  
  next();
};

// Admin middleware - רק מנהלים יכולים לגשת
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ 
      error: 'Admin access required',
      message: 'You need admin privileges to access this resource'
    });
  }

  console.log('✅ Admin access granted to:', req.user.name);
  next();
};
