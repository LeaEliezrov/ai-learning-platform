import React from 'react';
import { Card, CardContent, Box, Typography, Button } from '@mui/material';

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  color: string;
  disabled?: boolean;
}

export default function ActionCard({
  title,
  description,
  icon,
  action,
  color,
  disabled = false,
}: ActionCardProps) {
  return (
    <Card
      sx={{
        cursor: disabled ? 'default' : 'pointer',
        transition: 'all 0.3s ease',
        opacity: disabled ? 0.6 : 1,
        '&:hover': disabled ? {} : {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
      onClick={disabled ? undefined : action}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 3,
              bgcolor: color,
              color: 'white',
            }}
          >
            {icon}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {description}
            </Typography>
            <Button
              variant="outlined"
              size="large"
              disabled={disabled}
              sx={{
                borderColor: color,
                color: color,
                '&:hover': {
                  bgcolor: color,
                  color: 'white',
                },
              }}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
