import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Chip,
  IconButton,
  Fade,
} from '@mui/material';
import {
  AutoAwesome as AIIcon,
  ContentCopy as CopyIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
} from '@mui/icons-material';
import { formatRelativeTime } from '../../../shared/utils';

interface AIResponse {
  id?: number;
  response: string;
  categoryName?: string;
  subcategoryName?: string;
  createdAt?: string;
}

interface AIResponseDisplayProps {
  response: AIResponse;
  showActions?: boolean;
  variant?: 'default' | 'compact';
}

export default function AIResponseDisplay({
  response,
  showActions = true,
  variant = 'default',
}: AIResponseDisplayProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(response.response);
    // You can add a toast notification here
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'AI Learning Response',
        text: response.response,
      });
    }
  };

  const handleBookmark = () => {
    // TODO: Add bookmark functionality
  };

  return (
    <Fade in={true}>
      <Card 
        elevation={3} 
        sx={{ 
          mb: 3,
          border: '2px solid',
          borderColor: 'secondary.light',
          borderRadius: 2,
        }}
      >
        <CardContent>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AIIcon sx={{ mr: 1, color: 'secondary.main' }} />
            <Typography variant="h6" component="h3" sx={{ flexGrow: 1 }}>
              AI Response
            </Typography>
            
            {response.createdAt && (
              <Typography variant="caption" color="text.secondary">
                {formatRelativeTime(response.createdAt)}
              </Typography>
            )}
          </Box>

          {/* Category Tags */}
          {(response.categoryName || response.subcategoryName) && (
            <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {response.categoryName && (
                <Chip 
                  label={response.categoryName} 
                  size="small" 
                  color="primary" 
                  variant="outlined" 
                />
              )}
              {response.subcategoryName && (
                <Chip 
                  label={response.subcategoryName} 
                  size="small" 
                  color="secondary" 
                  variant="outlined" 
                />
              )}
            </Box>
          )}

          <Divider sx={{ mb: 2 }} />

          {/* Response Content */}
          <Typography 
            variant="body1" 
            sx={{ 
              lineHeight: 1.7,
              whiteSpace: 'pre-wrap',
              color: 'text.primary',
            }}
          >
            {response.response}
          </Typography>

          {/* Actions */}
          {showActions && (
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <IconButton 
                size="small" 
                onClick={handleCopy}
                title="Copy response"
              >
                <CopyIcon />
              </IconButton>
              <IconButton 
                size="small" 
                onClick={handleShare}
                title="Share response"
              >
                <ShareIcon />
              </IconButton>
              <IconButton 
                size="small" 
                onClick={handleBookmark}
                title="Bookmark response"
              >
                <BookmarkIcon />
              </IconButton>
            </Box>
          )}
        </CardContent>
      </Card>
    </Fade>
  );
}
