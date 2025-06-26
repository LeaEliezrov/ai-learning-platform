import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function RegisterFormFooter() {
  return (
    <Box sx={{ textAlign: 'center', mt: 2 }}>
      <Typography variant="body2" color="text.secondary">
        Already have an account?{' '}
        <Link
          to="/login"
          style={{
            color: '#1976d2',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Sign in here
        </Link>
      </Typography>
    </Box>
  );
}
