import React from 'react';
import {
  Card,
  Typography,
  Box,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Divider,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  CalendarToday as DateIcon,
  Category as CategoryIcon,
  QuestionAnswer as QuestionIcon,
  ContentCopy as CopyIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { formatDate, formatRelativeTime } from '../../../shared/utils';

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

interface PromptHistoryCardProps {
  prompt: PromptHistoryItem;
  expanded: boolean;
  onToggle: () => void;
}

export default function PromptHistoryCard({ prompt, expanded, onToggle }: PromptHistoryCardProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.response);
    // You can add a toast notification here
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Learning Response',
        text: `${prompt.prompt}\n\n${prompt.response}`,
      });
    }
  };

  return (
    <Card 
      elevation={2} 
      sx={{ 
        mb: 2,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          elevation: 4,
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Accordion expanded={expanded} onChange={onToggle}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ width: '100%', pr: 2 }}>
            {/* Header with metadata */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <QuestionIcon color="primary" />
                <Typography variant="subtitle2" color="text.secondary">
                  Question #{prompt.id}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DateIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  {formatRelativeTime(prompt.createdAt)}
                </Typography>
              </Box>
            </Box>

            {/* Categories */}
            <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
              {prompt.category && (
                <Chip
                  icon={<CategoryIcon />}
                  label={prompt.category.name}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              )}
              {prompt.subcategory && (
                <Chip
                  label={prompt.subcategory.name}
                  size="small"
                  color="secondary"
                  variant="outlined"
                />
              )}
            </Box>

            {/* Prompt preview */}
            <Typography 
              variant="body2" 
              sx={{ 
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: expanded ? 'none' : 2,
                WebkitBoxOrient: 'vertical',
                fontWeight: 500,
              }}
            >
              {prompt.prompt}
            </Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails>
          <Box>
            <Divider sx={{ mb: 2 }} />
            
            {/* Full Question */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="primary" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <QuestionIcon /> Your Question:
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, pl: 3 }}>
                {prompt.prompt}
              </Typography>
            </Box>

            {/* AI Response */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="secondary" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                🤖 AI Response:
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1.6,
                  pl: 3,
                  borderLeft: '3px solid',
                  borderLeftColor: 'secondary.light',
                  bgcolor: 'grey.50',
                  p: 2,
                  borderRadius: 1,
                }}
              >
                {prompt.response}
              </Typography>
            </Box>

            {/* Metadata */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Generated on {formatDate(prompt.createdAt)}
              </Typography>
              
              {/* Actions */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton size="small" onClick={handleCopy} title="Copy response">
                  <CopyIcon />
                </IconButton>
                <IconButton size="small" onClick={handleShare} title="Share">
                  <ShareIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
}
