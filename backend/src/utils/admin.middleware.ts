import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // בדיקה שהמשתמש מחובר (מה-authenticateToken middleware)
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // בדיקה שהמשתמש הוא אדמין במסד הנתונים
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.user.id) },
      select: { id: true, name: true, role: true }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.role !== 'ADMIN') {
      return res.status(403).json({ 
        error: 'Admin access required. Only administrators can access this resource.' 
      });
    }

    console.log('✅ Admin access granted for:', user.name);
    next();
  } catch (error) {
    console.error('Error checking admin status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
