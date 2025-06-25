import { useState, useEffect, useCallback } from 'react';
import { useAppDispatch } from '../app/hooks';
import { apiHelpers } from '../services/apiHelpers';

// Generic hook for async operations with loading/error states
export function useAsyncOperation<T, P = void>(
  operation: (params: P) => Promise<T>,
  immediate: boolean = false,
  deps: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (params: P) => {
    try {
      setLoading(true);
      setError(null);
      const result = await operation(params);
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = apiHelpers.handleError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => {
    if (immediate) {
      execute({} as P);
    }
  }, [immediate, execute]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
}

// Hook for managing form states with validation
export function useFormState<T extends Record<string, any>>(
  initialValues: T,
  validationRules?: Partial<Record<keyof T, (value: any) => string | null>>
) {  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouchedState] = useState<Partial<Record<keyof T, boolean>>>({});

  const setValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Validate field if rules exist
    if (validationRules?.[field]) {
      const error = validationRules[field]!(value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  }, [validationRules]);

  const setTouched = useCallback((field: keyof T, isTouched: boolean = true) => {
    setTouchedState(prev => ({ ...prev, [field]: isTouched }));
  }, []);

  const validateAll = useCallback(() => {
    if (!validationRules) return true;

    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(validationRules).forEach(field => {
      const rule = validationRules[field as keyof T];
      if (rule) {
        const error = rule(values[field as keyof T]);
        if (error) {
          newErrors[field as keyof T] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validationRules]);
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouchedState({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    setValue,
    setTouched,
    validateAll,
    reset,
    isValid: Object.keys(errors).length === 0,
  };
}

// Hook for managing lists with search and filtering
export function useList<T>(
  items: T[],
  searchField?: keyof T,
  filterFn?: (item: T, query: string) => boolean
) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<T[]>(items);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredItems(items);
      return;
    }

    const filtered = items.filter(item => {
      if (filterFn) {
        return filterFn(item, searchQuery);
      }
      
      if (searchField && item[searchField]) {
        const value = String(item[searchField]).toLowerCase();
        return value.includes(searchQuery.toLowerCase());
      }
      
      return true;
    });

    setFilteredItems(filtered);
  }, [items, searchQuery, searchField, filterFn]);

  const debouncedSetSearch = useCallback(
    apiHelpers.debounce(setSearchQuery, 300),
    []
  );

  return {
    items: filteredItems,
    searchQuery,
    setSearchQuery: debouncedSetSearch,
    clearSearch: () => setSearchQuery(''),
    totalItems: items.length,
    filteredCount: filteredItems.length,
  };
}
