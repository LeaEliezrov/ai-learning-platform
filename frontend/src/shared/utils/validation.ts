export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

export const validateField = (value: string, rules: ValidationRule): string | null => {
  // Required validation
  if (rules.required && (!value || value.trim().length === 0)) {
    return 'This field is required';
  }

  // Skip other validations if field is empty and not required
  if (!value || value.trim().length === 0) {
    return null;
  }

  // Min length validation
  if (rules.minLength && value.length < rules.minLength) {
    return `Minimum length is ${rules.minLength} characters`;
  }

  // Max length validation
  if (rules.maxLength && value.length > rules.maxLength) {
    return `Maximum length is ${rules.maxLength} characters`;
  }

  // Pattern validation
  if (rules.pattern && !rules.pattern.test(value)) {
    return 'Invalid format';
  }

  // Custom validation
  if (rules.custom) {
    return rules.custom(value);
  }

  return null;
};

export const validateForm = (data: { [key: string]: string }, rules: ValidationRules): ValidationResult => {
  const errors: { [key: string]: string } = {};

  Object.keys(rules).forEach(field => {
    const value = data[field] || '';
    const fieldRules = rules[field];
    const error = validateField(value, fieldRules);
    
    if (error) {
      errors[field] = error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Common validation patterns
export const validationPatterns = {
  phone: /^[0-9]{10}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  name: /^[a-zA-Z\s\u0590-\u05FF]{2,}$/, // Hebrew and English names
};

// Common validation rules
export const commonRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: validationPatterns.name,
    custom: (value: string) => {
      if (value.trim().length < 2) {
        return 'Name must be at least 2 characters';
      }
      return null;
    }
  },
  phone: {
    required: true,
    pattern: validationPatterns.phone,
    custom: (value: string) => {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length !== 10) {
        return 'Phone number must be exactly 10 digits';
      }
      if (!cleaned.startsWith('05')) {
        return 'Phone number must start with 05';
      }
      return null;
    }
  },
  prompt: {
    required: true,
    minLength: 10,
    maxLength: 1000,
    custom: (value: string) => {
      if (value.trim().length < 10) {
        return 'Please provide a more detailed question (at least 10 characters)';
      }
      return null;
    }
  }
};
