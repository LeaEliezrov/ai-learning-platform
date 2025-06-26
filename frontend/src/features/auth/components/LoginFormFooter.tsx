import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function LoginFormFooter() {
  return (
    <Box sx={{ textAlign: 'center', mt: 2 }}>
      <Typography variant="body2" color="text.secondary">
        Don't have an account?{' '}
        <Link
          to="/register"
          style={{
            color: '#1976d2',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Sign up here
        </Link>
      </Typography>
    </Box>
  );
}
