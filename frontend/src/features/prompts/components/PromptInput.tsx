import React from 'react';
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Box,
  InputAdornment,
} from '@mui/material';
import { AutoAwesome as AIIcon } from '@mui/icons-material';

interface PromptInputProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function PromptInput({
  prompt,
  onPromptChange,
  disabled = false,
  placeholder = "What would you like to learn about? Be specific with your question...",
}: PromptInputProps) {
  return (
    <Card elevation={2} sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AIIcon sx={{ mr: 1, color: 'secondary.main' }} />
          <Typography variant="h6" component="h2">
            Your Learning Question
          </Typography>
        </Box>
        
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          label="Enter your prompt"
          placeholder={placeholder}
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          disabled={disabled}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AIIcon color="secondary" />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: 'secondary.main',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'secondary.main',
              },
            },
          }}
        />
        
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          💡 Tip: The more specific your question, the better the AI response will be!
        </Typography>
      </CardContent>
    </Card>
  );
}
