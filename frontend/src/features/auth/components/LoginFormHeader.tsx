import React from 'react';
import { Box, Typography } from '@mui/material';
import { LoginOutlined } from '@mui/icons-material';

export default function LoginFormHeader() {
  return (
    <Box sx={{ mb: 3, textAlign: 'center' }}>
      <LoginOutlined sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
      <Typography 
        component="h1" 
        variant="h4" 
        sx={{ 
          fontWeight: 700,
          background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Welcome Back
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
        Sign in to continue your learning journey
      </Typography>
    </Box>
  );
}
