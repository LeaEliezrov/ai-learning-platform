import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Button,
} from '@mui/material';
import {
  Send as SendIcon,
  History as HistoryIcon,
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useAppSelector } from '../../../app/hooks';
import { CategorySelector, PromptInput, AIResponseDisplay } from '../components';
import { usePromptSubmission } from '../hooks';
import { PageHeader, CustomBreadcrumbs, ErrorAlert, LoadingCard, SubmitButton } from '../../../shared/components';

export default function PromptSubmissionPage() {
  const navigate = useNavigate();
  const { currentUser } = useAppSelector(state => state.user);

  // Use our custom hook for prompt submission
  const {
    categories,
    categoriesLoading,
    selectedCategoryId,
    selectedSubcategoryId,
    prompt,
    availableSubcategories,
    isSubmitting,
    submitError,
    lastResponse,
    setSelectedCategoryId,
    setSelectedSubcategoryId,
    setPrompt,
    handleSubmit,
    resetForm,
    clearSubmitError,
  } = usePromptSubmission();

  // Redirect if not authenticated
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const breadcrumbItems = [
    { label: 'Home', href: '/dashboard', icon: <HomeIcon /> },
    { label: 'AI Learning', href: '/prompts', current: true },
  ];

  const canSubmit = selectedCategoryId && selectedSubcategoryId && prompt.trim();

  if (categoriesLoading) {
    return <LoadingCard message="Loading categories..." />;
  }

  if (!currentUser) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <PageHeader 
        title="AI Learning Assistant"
        subtitle="Ask questions and get personalized learning responses"
      />

      {/* Breadcrumbs */}
      <CustomBreadcrumbs items={breadcrumbItems} />

      {/* Quick Actions */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </Button>
        <Button
          variant="outlined"
          startIcon={<HistoryIcon />}
          onClick={() => navigate('/history')}
        >
          Learning History
        </Button>
      </Box>

      {/* Error Alert */}
      {submitError && (
        <ErrorAlert 
          error={submitError} 
          onClose={clearSubmitError}
          sx={{ mb: 3 }}
        />
      )}

      {/* Main Content */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Category Selection */}
        <CategorySelector
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          selectedSubcategoryId={selectedSubcategoryId}
          onCategoryChange={setSelectedCategoryId}
          onSubcategoryChange={setSelectedSubcategoryId}
          availableSubcategories={availableSubcategories}
          disabled={isSubmitting}
        />

        {/* Prompt Input */}
        <PromptInput
          prompt={prompt}
          onPromptChange={setPrompt}
          disabled={isSubmitting}
        />        {/* Submit Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <SubmitButton
            loading={isSubmitting}
            disabled={!canSubmit}
            onClick={handleSubmit}
            startIcon={<SendIcon />}
            size="large"
          >
            Get AI Response
          </SubmitButton>
        </Box>

        {/* AI Response */}
        {lastResponse && (
          <AIResponseDisplay 
            response={{
              id: lastResponse.prompt.id,
              response: lastResponse.prompt.response,
              categoryName: lastResponse.prompt.category?.name,
              subcategoryName: lastResponse.prompt.SubCategory?.name,
              createdAt: lastResponse.prompt.createdAt,
            }}
          />
        )}

        {/* New Prompt Button */}
        {lastResponse && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant="outlined"
              onClick={resetForm}
              disabled={isSubmitting}
            >
              Ask Another Question
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}
