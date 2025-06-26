import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Button,
  Box,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  History as HistoryIcon,
  Home as HomeIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useAppSelector } from '../../../app/hooks';
import { PromptHistoryList } from '../components';
import { useLearningHistory } from '../hooks';
import { PageHeader, CustomBreadcrumbs } from '../../../shared/components';

export default function LearningHistoryPage() {
  const navigate = useNavigate();
  const { currentUser } = useAppSelector(state => state.user);

  // Use our custom hook for learning history
  const {
    prompts,
    loading,
    error,
    pagination,
    expandedPrompt,
    setExpandedPrompt,
    handlePageChange,
    refreshHistory,
    clearHistoryError,
  } = useLearningHistory();

  // Redirect if not authenticated
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const breadcrumbItems = [
    { label: 'Home', href: '/dashboard', icon: <HomeIcon /> },
    { label: 'Learning History', href: '/history', current: true },
  ];

  const handleTogglePrompt = (promptId: number) => {
    setExpandedPrompt(expandedPrompt === promptId ? null : promptId);
  };

  if (!currentUser) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <PageHeader 
        title="Learning History"
        subtitle="Review your past AI learning sessions and responses"
        icon={<HistoryIcon />}
      />

      {/* Breadcrumbs */}
      <CustomBreadcrumbs items={breadcrumbItems} />

      {/* Quick Actions */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </Button>
          <Button
            variant="outlined"
            onClick={refreshHistory}
          >
            Refresh
          </Button>
        </Box>
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/prompts')}
          size="large"
        >
          Ask New Question
        </Button>
      </Box>

      {/* Learning History List */}
      <PromptHistoryList
        prompts={prompts}
        loading={loading}
        error={error}
        pagination={pagination}
        expandedPrompt={expandedPrompt}
        onTogglePrompt={handleTogglePrompt}
        onPageChange={handlePageChange}
      />
    </Container>
  );
}
