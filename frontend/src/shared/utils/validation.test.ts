import { validateField, validateForm, commonRules } from '../utils/validation';

describe('Validation Utils', () => {
  describe('validateField', () => {
    it('should pass validation for valid name', () => {
      const result = validateField('John Doe', commonRules.name);
      expect(result).toBeNull();
    });

    it('should fail validation for empty required field', () => {
      const result = validateField('', { required: true });
      expect(result).toBe('This field is required');
    });

    it('should fail validation for short name', () => {
      const result = validateField('J', commonRules.name);
      expect(result).toBe('Minimum length is 2 characters');
    });

    it('should pass validation for valid Israeli phone number', () => {
      const result = validateField('0501234567', commonRules.phone);
      expect(result).toBeNull();
    });

    it('should fail validation for invalid phone number', () => {
      const result = validateField('123456789', commonRules.phone);
      expect(result).toBe('Invalid format');
    });
  });

  describe('validateForm', () => {
    it('should validate entire form correctly', () => {
      const formData = {
        name: 'John Doe',
        phone: '0501234567'
      };
      
      const rules = {
        name: commonRules.name,
        phone: commonRules.phone
      };

      const result = validateForm(formData, rules);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it('should return errors for invalid form', () => {
      const formData = {
        name: 'J',
        phone: '123'
      };
      
      const rules = {
        name: commonRules.name,
        phone: commonRules.phone
      };

      const result = validateForm(formData, rules);
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBeDefined();
      expect(result.errors.phone).toBeDefined();
    });
  });
});
