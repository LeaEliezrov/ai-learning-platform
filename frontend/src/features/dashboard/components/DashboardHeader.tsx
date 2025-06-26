import React from 'react';
import { Paper, Box, Avatar, Typography, Button, Chip } from '@mui/material';
import { Person as PersonIcon, Logout as LogoutIcon } from '@mui/icons-material';

interface User {
  name: string;
  phone: string;
  role: 'USER' | 'ADMIN';
}

interface DashboardHeaderProps {
  user: User;
  onLogout: () => void;
}

export default function DashboardHeader({ user, onLogout }: DashboardHeaderProps) {
  return (
    <Paper
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        p: 4,
        mb: 4,
        borderRadius: 3,
        position: 'relative',
      }}
    >
      {/* Logout Button */}
      <Button
        startIcon={<LogoutIcon />}
        onClick={onLogout}
        variant="contained"
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
          },
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 600,
        }}
      >
        🚪 Logout
      </Button>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            mr: 3,
            fontSize: '2rem',
          }}
        >
          <PersonIcon sx={{ fontSize: '2rem' }} />
        </Avatar>
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Welcome back, {user.name}!
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              label={user.role}
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontWeight: 600,
              }}
            />
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              📱 {user.phone}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto', mt: 2, textAlign: 'center' }}>
        Ready to continue your learning journey? Choose an option below to get started.
      </Typography>
    </Paper>
  );
}
