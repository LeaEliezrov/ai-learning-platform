import React from 'react';
import { Box, Typography, Pagination } from '@mui/material';
import { LoadingCard, ErrorAlert } from '../../../shared/components';
import PromptHistoryCard from './PromptHistoryCard';

interface PromptHistoryItem {
  id: number;
  prompt: string;
  response: string;
  createdAt: string;
  category: {
    id: number;
    name: string;
  };
  subcategory: {
    id: number;
    name: string;
  };
}

interface PromptHistoryListProps {
  prompts: PromptHistoryItem[];
  loading: boolean;
  error: string | null;
  pagination: {
    total: number;
    pages: number;
    currentPage: number;
  };
  expandedPrompt: number | null;
  onTogglePrompt: (promptId: number) => void;
  onPageChange: (page: number) => void;
}

export default function PromptHistoryList({
  prompts,
  loading,
  error,
  pagination,
  expandedPrompt,
  onTogglePrompt,
  onPageChange,
}: PromptHistoryListProps) {
  if (loading) {
    return <LoadingCard message="Loading your learning history..." />;
  }
  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (!prompts || prompts.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          No learning history yet
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Start asking questions to build your learning history!
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Results Summary */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Showing {prompts.length} of {pagination.total} learning sessions
      </Typography>

      {/* History List */}
      <Box sx={{ mb: 4 }}>
        {prompts.map((prompt) => (
          <PromptHistoryCard
            key={prompt.id}
            prompt={prompt}
            expanded={expandedPrompt === prompt.id}
            onToggle={() => onTogglePrompt(prompt.id)}
          />
        ))}
      </Box>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={pagination.pages}
            page={pagination.currentPage}
            onChange={(_, page) => onPageChange(page)}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
  );
}
