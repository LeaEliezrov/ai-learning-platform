import { useState, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { submitPrompt, resetSubmitStatus, clearError } from '../promptsSlice';
import { fetchCategories } from '../../categories/categoriesSlice';

interface UsePromptSubmissionReturn {
  // Categories state
  categories: any[];
  categoriesLoading: boolean;
  
  // Form state
  selectedCategoryId: string;
  selectedSubcategoryId: string;
  prompt: string;
  availableSubcategories: any[];
  
  // Submission state
  isSubmitting: boolean;
  submitError: string | null;
  lastResponse: any;
  
  // Actions
  setSelectedCategoryId: (id: string) => void;
  setSelectedSubcategoryId: (id: string) => void;
  setPrompt: (prompt: string) => void;
  handleSubmit: () => Promise<void>;
  resetForm: () => void;
  clearSubmitError: () => void;
}

export function usePromptSubmission(): UsePromptSubmissionReturn {
  const dispatch = useAppDispatch();
  
  // Redux state
  const { categories, status: categoriesStatus } = useAppSelector(state => state.categories);
  const { submitStatus, error, lastResponse } = useAppSelector(state => state.prompts);
  
  // Local state
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState('');
  const [prompt, setPrompt] = useState('');
  const [availableSubcategories, setAvailableSubcategories] = useState<any[]>([]);

  // Load categories on mount
  useEffect(() => {
    if (categoriesStatus === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, categoriesStatus]);
  // Update subcategories when category changes
  useEffect(() => {
    if (selectedCategoryId) {
      const category = categories.find(cat => cat.id.toString() === selectedCategoryId);
      if (category?.subCategories) {
        setAvailableSubcategories(category.subCategories);
      } else {
        setAvailableSubcategories([]);
      }
      // Reset subcategory selection when category changes
      setSelectedSubcategoryId('');
    } else {
      setAvailableSubcategories([]);
      setSelectedSubcategoryId('');
    }
  }, [selectedCategoryId, categories]);

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    if (!prompt.trim() || !selectedCategoryId || !selectedSubcategoryId) {
      return;
    }

    try {
      const result = await dispatch(submitPrompt({
        prompt: prompt.trim(),
        categoryId: parseInt(selectedCategoryId),
        subcategoryId: parseInt(selectedSubcategoryId),
      }));

      if (submitPrompt.fulfilled.match(result)) {
        // Form submitted successfully
      }
    } catch (error) {
      // Error handling is done in the slice
    }
  }, [dispatch, prompt, selectedCategoryId, selectedSubcategoryId]);

  // Reset form
  const resetForm = useCallback(() => {
    setSelectedCategoryId('');
    setSelectedSubcategoryId('');
    setPrompt('');
    setAvailableSubcategories([]);
    dispatch(resetSubmitStatus());
  }, [dispatch]);

  // Clear submit error
  const clearSubmitError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    // Categories state
    categories,
    categoriesLoading: categoriesStatus === 'loading',
    
    // Form state
    selectedCategoryId,
    selectedSubcategoryId,
    prompt,
    availableSubcategories,
    
    // Submission state
    isSubmitting: submitStatus === 'loading',
    submitError: error,
    lastResponse,
    
    // Actions
    setSelectedCategoryId,
    setSelectedSubcategoryId,
    setPrompt,
    handleSubmit,
    resetForm,
    clearSubmitError,
  };
}
