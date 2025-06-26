import { useState, useCallback } from 'react';
import { ValidationRules, validateForm, validateField } from '../utils/validation';

interface UseFormOptions {
  initialValues: { [key: string]: string };
  validationRules?: ValidationRules;
  onSubmit?: (values: { [key: string]: string }) => Promise<void> | void;
}

export const useForm = ({ initialValues, validationRules = {}, onSubmit }: UseFormOptions) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback((field: string, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  const setFieldTouched = useCallback((field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Validate field on blur if there are rules
    if (validationRules[field]) {
      const error = validateField(values[field] || '', validationRules[field]);
      setErrors(prev => ({ ...prev, [field]: error || '' }));
    }
  }, [validationRules, values]);

  const validateAll = useCallback(() => {
    const result = validateForm(values, validationRules);
    setErrors(result.errors);
    return result.isValid;
  }, [values, validationRules]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    setIsSubmitting(true);
    
    // Mark all fields as touched
    const allTouched = Object.keys(validationRules).reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {} as { [key: string]: boolean });
    setTouched(allTouched);
    
    // Validate all fields
    const isValid = validateAll();
    
    if (isValid && onSubmit) {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
    
    setIsSubmitting(false);
  }, [values, validationRules, validateAll, onSubmit]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const getFieldProps = useCallback((field: string) => ({
    value: values[field] || '',
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(field, e.target.value);
    },
    onBlur: () => setFieldTouched(field),
    error: touched[field] && !!errors[field],
    helperText: touched[field] ? errors[field] : ''
  }), [values, setValue, setFieldTouched, touched, errors]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setFieldTouched,
    handleSubmit,
    reset,
    validateAll,
    getFieldProps,
    isValid: Object.keys(errors).length === 0
  };
};
