import { useState, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchUserPrompts, clearError } from '../promptsSlice';

interface UseLearningHistoryReturn {
  prompts: any[];
  loading: boolean;
  error: string | null;
  pagination: {
    total: number;
    pages: number;
    currentPage: number;
  };
  expandedPrompt: number | null;
  setExpandedPrompt: (id: number | null) => void;
  currentPage: number;
  handlePageChange: (page: number) => void;
  refreshHistory: () => void;
  clearHistoryError: () => void;
}

export function useLearningHistory(): UseLearningHistoryReturn {
  const dispatch = useAppDispatch();
  const { prompts, status, error, pagination } = useAppSelector(state => state.prompts);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedPrompt, setExpandedPrompt] = useState<number | null>(null);

  // Fetch prompts when page changes
  useEffect(() => {
    dispatch(fetchUserPrompts({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    setExpandedPrompt(null); // Close expanded items when changing pages
  }, []);

  const refreshHistory = useCallback(() => {
    dispatch(fetchUserPrompts({ page: currentPage }));
  }, [dispatch, currentPage]);

  const clearHistoryError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    prompts: prompts || [],
    loading: status === 'loading',
    error,
    pagination: {
      total: pagination?.total || 0,
      pages: pagination?.pages || 0,
      currentPage,
    },
    expandedPrompt,
    setExpandedPrompt,
    currentPage,
    handlePageChange,
    refreshHistory,
    clearHistoryError,
  };
}
