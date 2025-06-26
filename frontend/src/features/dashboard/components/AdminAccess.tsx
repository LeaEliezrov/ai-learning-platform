import React from 'react';
import { Card, CardContent, Box, Typography, Button } from '@mui/material';
import { AdminPanelSettings as AdminIcon } from '@mui/icons-material';

interface AdminAccessProps {
  onNavigateToAdmin: () => void;
}

export default function AdminAccess({ onNavigateToAdmin }: AdminAccessProps) {
  return (
    <Card sx={{ mb: 4, border: '2px solid', borderColor: 'warning.main' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AdminIcon sx={{ fontSize: 40, color: 'warning.main', mr: 2 }} />
            <Box>
              <Typography variant="h5" component="h2" gutterBottom>
                Admin Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage users, view all prompts, and access platform analytics
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            color="warning"
            size="large"
            onClick={onNavigateToAdmin}
            startIcon={<AdminIcon />}
            sx={{ minWidth: 180 }}
          >
            Admin Panel
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
