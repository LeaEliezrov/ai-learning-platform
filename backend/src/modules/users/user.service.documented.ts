/**
 * User Authentication Service
 * 
 * This service handles all user authentication operations including
 * registration, login, token generation, and user management.
 * 
 * @author AI Learning Platform Team
 * @version 1.0.0
 */

import { PrismaClient } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../../config/jwt';

const prisma = new PrismaClient();

/**
 * Generates a JWT token for authenticated users
 * 
 * @param userId - Unique identifier for the user
 * @param name - User's display name
 * @param phone - User's phone number (used for login)
 * @param role - User's role (USER or ADMIN)
 * @returns JWT token string valid for 24 hours
 * 
 * @example
 * ```typescript
 * const token = generateToken(1, "John Doe", "0501234567", "USER");
 * ```
 */
export const generateToken = (
  userId: number, 
  name: string, 
  phone: string, 
  role: 'USER' | 'ADMIN' = 'USER'
): string => {
  const payload = { 
    id: userId,
    name, 
    phone,
    role
  };
  
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

/**
 * Creates a new user in the database
 * 
 * @param data - User data containing name and phone
 * @returns Promise<User> - Created user object
 * 
 * @throws {Error} If user already exists or validation fails
 */
export const createUser = (data: { name: string; phone: string }) => {
  return prisma.user.create({ data });
};

/**
 * Retrieves all users from the database
 * Used primarily by admin dashboard for user management
 * 
 * @returns Promise<User[]> - Array of all users
 */
export const findAllUsers = () => {
  return prisma.user.findMany();
};

/**
 * Finds a specific user by ID
 * 
 * @param id - User's unique identifier
 * @returns Promise<User | null> - User object or null if not found
 */
export const findUserById = (id: number) => {
  return prisma.user.findUnique({ where: { id } });
};

/**
 * Removes a user from the database
 * This operation also cascades to remove all user's prompts
 * 
 * @param id - User's unique identifier
 * @returns Promise<User> - Deleted user object
 */
export const removeUser = (id: number) => {
  return prisma.user.delete({ where: { id } });
};

/**
 * Updates user information
 * 
 * @param id - User's unique identifier
 * @param data - Updated user data (partial)
 * @returns Promise<User> - Updated user object
 */
export const modifyUser = (id: number, data: { name?: string; phone?: string }) => {
  return prisma.user.update({ where: { id }, data });
};

/**
 * Authenticates user by name and phone combination
 * Used for login functionality
 * 
 * @param name - User's name
 * @param phone - User's phone number
 * @returns Promise<User | null> - User object if found, null otherwise
 */
export const findUserByNameAndPhone = (name: string, phone: string) => {
  return prisma.user.findFirst({
    where: {
      name,
      phone,
    },
  });
};
