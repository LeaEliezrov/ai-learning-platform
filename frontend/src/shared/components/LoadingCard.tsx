import React from 'react';
import { Box, Card, CardContent, Typography, CircularProgress } from '@mui/material';

interface LoadingCardProps {
  message?: string;
  size?: number;
}

export default function LoadingCard({ message = 'Loading...', size = 40 }: LoadingCardProps) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
          <CircularProgress size={size} />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            {message}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
