import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backPath?: string;
  actions?: React.ReactNode;
  icon?: React.ReactNode;
}

export default function PageHeader({ 
  title, 
  subtitle, 
  backPath, 
  actions, 
  icon 
}: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {backPath && (
            <IconButton onClick={() => navigate(backPath)} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
          )}
          {icon && <Box sx={{ mr: 2 }}>{icon}</Box>}
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="subtitle1" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
        {actions && <Box>{actions}</Box>}
      </Box>
    </Box>
  );
}
