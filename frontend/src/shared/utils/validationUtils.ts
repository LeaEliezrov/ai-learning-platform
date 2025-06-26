// Phone number validation and formatting utilities

export const formatPhoneNumber = (value: string): string => {
  // Remove all non-digit characters
  const cleaned = value.replace(/\D/g, '');
  
  // Limit to 10 digits
  const limited = cleaned.slice(0, 10);
  
  // Format as XXX-XXX-XXXX
  if (limited.length >= 6) {
    return `${limited.slice(0, 3)}-${limited.slice(3, 6)}-${limited.slice(6)}`;
  } else if (limited.length >= 3) {
    return `${limited.slice(0, 3)}-${limited.slice(3)}`;
  }
  
  return limited;
};

export const validatePhoneNumber = (phone: string): string | null => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (!phone.trim()) {
    return 'Phone number is required';
  }
  
  if (cleaned.length !== 10) {
    return 'Phone number must be exactly 10 digits';
  }
  
  return null;
};

export const validateName = (name: string): string | null => {
  if (!name.trim()) {
    return 'Name is required';
  }
  
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters long';
  }
  
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return 'Password is required';
  }
  
  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  
  return null;
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }
  
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  
  return null;
};
