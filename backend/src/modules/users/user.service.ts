import { PrismaClient } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../../config/jwt';

const prisma = new PrismaClient();

// יצירת טוקן JWT
export const generateToken = (userId: number, name: string, phone: string, role: 'USER' | 'ADMIN' = 'USER'): string => {
  const payload = { 
    id: userId,
    name, 
    phone,
    role
  };
  
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

export const createUser = (data: { name: string; phone: string }) => {
  return prisma.user.create({ data });
};

export const findAllUsers = () => {
  return prisma.user.findMany();
};

export const findUserById = (id: number) => {
  return prisma.user.findUnique({ where: { id } });
};

export const removeUser = (id: number) => {
  return prisma.user.delete({ where: { id } });
};

export const modifyUser = (id: number, data: { name?: string; phone?: string }) => {
  return prisma.user.update({ where: { id }, data });
};

export const findUserByNameAndPhone = (name: string, phone: string) => {
  return prisma.user.findFirst({
    where: {
      name,
      phone,
    },
  });
};
