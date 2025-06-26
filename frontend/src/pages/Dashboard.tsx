import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import {
  Category as CategoryIcon,
  QuestionAnswer as QuestionAnswerIcon,
  History as HistoryIcon,
  AutoAwesome as AIIcon,
} from '@mui/icons-material';
import { useAppSelector } from '../app/hooks';
import { useAuth } from '../shared/hooks/useAuth';
import {
  DashboardHeader,
  ActionCard,
  QuickStats,
  AdminAccess,
} from '../features/dashboard/components';

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser } = useAppSelector(state => state.user);
  const { logout } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  const isAdmin = currentUser.role === 'ADMIN';

  const mainActions = [
    {
      title: 'Explore Categories',
      description: 'Browse through different learning topics and subjects',
      icon: <CategoryIcon sx={{ fontSize: 40 }} />,
      action: () => navigate('/categories'),
      color: '#2196F3',
    },
    {
      title: 'Ask AI',
      description: 'Submit a prompt and get AI-generated learning content',
      icon: <AIIcon sx={{ fontSize: 40 }} />,
      action: () => navigate('/prompts'),
      color: '#4CAF50',
    },
    {
      title: 'Learning History',
      description: 'View your past learning sessions and AI responses',
      icon: <HistoryIcon sx={{ fontSize: 40 }} />,
      action: () => navigate('/history'),
      color: '#FF9800',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <DashboardHeader user={currentUser} onLogout={logout} />

      {/* Admin Dashboard Access */}
      {isAdmin && <AdminAccess onNavigateToAdmin={() => navigate('/admin')} />}

      {/* Main Actions */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
        {mainActions.map((action, index) => (
          <ActionCard
            key={index}
            title={action.title}
            description={action.description}
            icon={action.icon}
            action={action.action}
            color={action.color}
          />
        ))}
      </Box>

      {/* Quick Stats */}
      <QuickStats />
    </Container>
  );
}
