import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Alert,
  Chip,
  Paper,
  Divider,
  IconButton,
  Breadcrumbs,
  Link,
  Grid,
  Pagination,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  History as HistoryIcon,
  Home as HomeIcon,
  AutoAwesome as AIIcon,
  ExpandMore as ExpandMoreIcon,
  CalendarToday as DateIcon,
  Category as CategoryIcon,
  QuestionAnswer as QuestionIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchUserPrompts, clearError } from '../promptsSlice';

export default function LearningHistoryPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
    const { prompts, status, error, pagination } = useAppSelector(state => state.prompts);
  const { currentUser } = useAppSelector(state => state.user);

  const [page, setPage] = useState(1);
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    dispatch(fetchUserPrompts({ page }));
  }, [dispatch, currentUser, navigate, page]);

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!currentUser) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header with Breadcrumbs */}
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link
            color="inherit"
            href="/dashboard"
            onClick={(e) => {
              e.preventDefault();
              navigate('/dashboard');
            }}
            sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            דף הבית
          </Link>
          <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
            <HistoryIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            היסטוריית למידה
          </Typography>
        </Breadcrumbs>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              <HistoryIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              היסטוריית הלמידה שלי
            </Typography>
            <Typography variant="body1" color="text.secondary">
              כאן תוכל לראות את כל השיחות וההסברים שקיבלת מה-AI
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<QuestionIcon />}
            onClick={() => navigate('/prompts')}
            sx={{ ml: 2 }}
          >
            שאלה חדשה
          </Button>
        </Box>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          onClose={() => dispatch(clearError())}
        >
          {error}
        </Alert>
      )}      {/* Loading State */}
      {status === 'loading' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Empty State */}
      {status === 'succeeded' && (!prompts || prompts.length === 0) && (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <HistoryIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            עדיין לא שאלת שאלות
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            התחל את המסע שלך על ידי שאילת השאלה הראשונה
          </Typography>
          <Button
            variant="contained"
            startIcon={<QuestionIcon />}
            onClick={() => navigate('/prompts')}
          >
            שאל שאלה ראשונה
          </Button>
        </Paper>
      )}      {/* Prompts List */}
      {status === 'succeeded' && prompts && prompts.length > 0 && (
        <Box>
          {prompts.map((prompt, index) => (
            <Accordion
              key={prompt.id}
              expanded={expandedAccordion === `panel${prompt.id}`}
              onChange={handleAccordionChange(`panel${prompt.id}`)}
              sx={{ mb: 2 }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${prompt.id}bh-content`}
                id={`panel${prompt.id}bh-header`}
              >
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {prompt.prompt.length > 100 
                        ? `${prompt.prompt.substring(0, 100)}...` 
                        : prompt.prompt}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                      <Chip
                        icon={<CategoryIcon />}
                        label={prompt.category.name}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Chip
                        label={prompt.SubCategory.name}
                        size="small"
                        color="secondary"
                        variant="outlined"
                      />
                      <Chip
                        icon={<DateIcon />}
                        label={formatDate(prompt.createdAt)}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                </Box>
              </AccordionSummary>              <AccordionDetails>
                <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
                  <Box sx={{ flex: 1 }}>
                    <Paper sx={{ p: 2, height: '100%' }}>
                      <Typography variant="h6" gutterBottom color="primary">
                        <QuestionIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                        השאלה שלך:
                      </Typography>
                      <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                        {prompt.prompt}
                      </Typography>
                    </Paper>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Paper sx={{ p: 2, height: '100%', bgcolor: 'grey.50' }}>
                      <Typography variant="h6" gutterBottom color="secondary">
                        <AIIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                        תשובת ה-AI:
                      </Typography>
                      <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                        {prompt.response}
                      </Typography>
                    </Paper>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}          {/* Pagination */}
          {pagination && pagination.pages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={pagination.pages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </Box>
      )}

      {/* Back Button */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/dashboard')}
        >
          חזור לדף הבית
        </Button>
      </Box>
    </Container>
  );
}
