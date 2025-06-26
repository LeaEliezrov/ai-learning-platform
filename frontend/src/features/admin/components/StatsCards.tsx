import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import {
  People as PeopleIcon,
  QuestionAnswer as PromptsIcon,
  AdminPanelSettings as AdminIcon,
  TrendingUp as StatsIcon,
} from '@mui/icons-material';
import { User } from '../../../shared/types';

interface StatsCardsProps {
  totalUsers: number;
  totalPrompts: number;
  users: User[];
}

export default function StatsCards({ totalUsers, totalPrompts, users }: StatsCardsProps) {
  const activeAdmins = users?.filter(u => u.role === 'ADMIN').length || 0;
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
      <Card sx={{ flex: '1 1 250px' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography color="textSecondary" gutterBottom variant="h6">
                Total Users
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {totalUsers}
              </Typography>
            </Box>
            <PeopleIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ flex: '1 1 250px' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography color="textSecondary" gutterBottom variant="h6">
                Total Prompts
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {totalPrompts}
              </Typography>
            </Box>
            <PromptsIcon sx={{ fontSize: 40, color: 'secondary.main' }} />
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ flex: '1 1 250px' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography color="textSecondary" gutterBottom variant="h6">
                Active Admins
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {activeAdmins}
              </Typography>
            </Box>
            <AdminIcon sx={{ fontSize: 40, color: 'warning.main' }} />
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ flex: '1 1 250px' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography color="textSecondary" gutterBottom variant="h6">
                Platform Status
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                ✓ Online
              </Typography>
            </Box>
            <StatsIcon sx={{ fontSize: 40, color: 'success.main' }} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
