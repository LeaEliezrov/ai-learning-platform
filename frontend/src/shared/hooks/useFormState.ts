import { useState, useCallback } from 'react';

interface UseFormStateOptions<T> {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
}

interface UseFormStateReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  handleChange: (name: keyof T, value: string) => void;
  handleSubmit: (onSubmit: (values: T) => void | Promise<void>) => (e: React.FormEvent) => Promise<void>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof T, string>>>>;
  setValues: React.Dispatch<React.SetStateAction<T>>;
  resetForm: () => void;
  isValid: boolean;
}

export function useFormState<T extends Record<string, any>>({
  initialValues,
  validate,
}: UseFormStateOptions<T>): UseFormStateReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = useCallback((name: keyof T, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleSubmit = useCallback((onSubmit: (values: T) => void | Promise<void>) => {
    return async (e: React.FormEvent) => {
      e.preventDefault();
      
      // Run validation if provided
      if (validate) {
        const validationErrors = validate(values);
        setErrors(validationErrors);
        
        // Check if there are any errors
        const hasErrors = Object.values(validationErrors).some(error => error);
        if (hasErrors) {
          return;
        }
      }
      
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    };
  }, [values, validate]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  const isValid = Object.values(errors).every(error => !error);

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    setErrors,
    setValues,
    resetForm,
    isValid,
  };
}
