import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

describe('User Service Tests', () => {
  describe('JWT Token Generation', () => {
    it('should generate a valid JWT token', () => {
      const payload = { userId: 1, role: 'USER' };
      const secret = 'test-secret';
      
      const token = jwt.sign(payload, secret, { expiresIn: '1h' });
      
      expect(token).toBeTruthy();
      expect(typeof token).toBe('string');
    });

    it('should verify a valid JWT token', () => {
      const payload = { userId: 1, role: 'USER' };
      const secret = 'test-secret';
      
      const token = jwt.sign(payload, secret, { expiresIn: '1h' });
      const decoded = jwt.verify(token, secret) as any;
      
      expect(decoded.userId).toBe(1);
      expect(decoded.role).toBe('USER');
    });
  });

  describe('Phone Number Validation', () => {
    const validateIsraeliPhone = (phone: string): boolean => {
      const phoneRegex = /^05\d{8}$/;
      return phoneRegex.test(phone);
    };

    it('should validate correct Israeli phone numbers', () => {
      expect(validateIsraeliPhone('0501234567')).toBe(true);
      expect(validateIsraeliPhone('0521234567')).toBe(true);
      expect(validateIsraeliPhone('0531234567')).toBe(true);
    });

    it('should reject invalid phone numbers', () => {
      expect(validateIsraeliPhone('123456789')).toBe(false);
      expect(validateIsraeliPhone('05123')).toBe(false);
      expect(validateIsraeliPhone('invalid')).toBe(false);
      expect(validateIsraeliPhone('')).toBe(false);
    });
  });

  describe('User Role Validation', () => {
    it('should validate user roles', () => {
      const validRoles = ['USER', 'ADMIN'];
      
      expect(validRoles.includes('USER')).toBe(true);
      expect(validRoles.includes('ADMIN')).toBe(true);
      expect(validRoles.includes('INVALID')).toBe(false);
    });
  });
});
