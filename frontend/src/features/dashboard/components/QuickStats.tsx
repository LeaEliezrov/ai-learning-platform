import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { School as SchoolIcon } from '@mui/icons-material';

interface StatsItem {
  icon: string;
  title: string;
  description: string;
}

interface QuickStatsProps {
  stats?: StatsItem[];
}

const defaultStats: StatsItem[] = [
  {
    icon: 'AI',
    title: 'AI',
    description: 'Powered Learning',
  },
  {
    icon: '24/7',
    title: '24/7',
    description: 'Available Anytime',
  },
  {
    icon: '∞',
    title: '∞',
    description: 'Learning Topics',
  },
  {
    icon: '📚',
    title: '📚',
    description: 'Personalized Content',
  },
];

export default function QuickStats({ stats = defaultStats }: QuickStatsProps) {
  return (
    <Paper sx={{ p: 3, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        <SchoolIcon sx={{ mr: 1 }} />
        Platform Features
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
        {stats.map((stat, index) => (
          <Box key={index} sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
              {stat.icon}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {stat.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
