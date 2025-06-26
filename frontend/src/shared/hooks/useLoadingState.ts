import { useState, useCallback } from 'react';

interface LoadingState {
  loading: boolean;
  error: string | null;
}

export const useLoadingState = (initialLoading = false) => {
  const [state, setState] = useState<LoadingState>({
    loading: initialLoading,
    error: null,
  });

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error, loading: false }));
  }, []);

  const reset = useCallback(() => {
    setState({ loading: false, error: null });
  }, []);

  const execute = useCallback(async <T>(
    asyncFn: () => Promise<T>
  ): Promise<T | null> => {
    try {
      setState({ loading: true, error: null });
      const result = await asyncFn();
      setState({ loading: false, error: null });
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setState({ loading: false, error: errorMessage });
      return null;
    }
  }, []);

  return {
    ...state,
    setLoading,
    setError,
    reset,
    execute,
  };
};
