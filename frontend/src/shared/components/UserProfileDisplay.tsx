import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';

interface User {
  name: string;
  phone?: string;
  role?: 'USER' | 'ADMIN';
}

interface UserProfileDisplayProps {
  user: User;
  onLogout: () => void;
  showLogout?: boolean;
  variant?: 'compact' | 'full';
}

export default function UserProfileDisplay({ 
  user, 
  onLogout, 
  showLogout = true,
  variant = 'full'
}: UserProfileDisplayProps) {
  if (variant === 'compact') {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-end',
        px: 3,
        py: 1.5,
        backgroundColor: '#1976d2',
        borderRadius: 3,
        color: 'white',
        boxShadow: 3,
        border: '2px solid #0d47a1'
      }}>
        <Typography variant="body1" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
          👨‍💼 {user.name}
        </Typography>
        {user.role && (
          <Typography variant="caption" sx={{ opacity: 0.9, fontWeight: 500 }}>
            {user.role === 'ADMIN' ? 'Administrator' : 'User'}
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-end',
        px: 3,
        py: 1.5,
        backgroundColor: '#1976d2',
        borderRadius: 3,
        color: 'white',
        boxShadow: 3,
        border: '2px solid #0d47a1'
      }}>
        <Typography variant="body1" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
          👨‍💼 {user.name}
        </Typography>
        {user.role && (
          <Typography variant="caption" sx={{ opacity: 0.9, fontWeight: 500 }}>
            {user.role === 'ADMIN' ? 'Administrator' : 'User'}
          </Typography>
        )}
        {user.phone && (
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            📱 {user.phone}
          </Typography>
        )}
      </Box>
      
      {showLogout && (
        <Button
          startIcon={<LogoutIcon />}
          onClick={onLogout}
          variant="contained"
          color="error"
          size="large"
          sx={{ 
            borderRadius: 3,
            textTransform: 'none',
            fontWeight: 700,
            px: 3,
            py: 1.5,
            boxShadow: 2,
            backgroundColor: '#d32f2f',
            '&:hover': {
              backgroundColor: '#b71c1c',
              boxShadow: 4
            }
          }}
        >
          🚪 Logout
        </Button>
      )}
    </Box>
  );
}
