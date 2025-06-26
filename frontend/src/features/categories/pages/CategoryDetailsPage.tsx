import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Breadcrumbs,
  Link,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  IconButton,
} from '@mui/material';
import { 
  Home, 
  Category as CategoryIcon, 
  ArrowBack,
  Quiz as SubcategoryIcon
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import type { RootState } from '../../../app/store';
import { fetchSubcategories, fetchCategoryById, clearError } from '../categoriesSlice';
import { Category, Subcategory } from '../types';

export default function CategoryDetailsPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  
  const { 
    selectedCategory, 
    subcategories, 
    status, 
    error 
  } = useAppSelector((state: RootState) => state.categories);

  // אם יש category מה-state של הניווט, נשתמש בו
  const categoryFromState = location.state?.category as Category | undefined;

  useEffect(() => {
    if (categoryId) {
      const id = parseInt(categoryId, 10);
      
      // אם אין קטגוריה ב-state, נטען אותה
      if (!categoryFromState && (!selectedCategory || selectedCategory.id !== id)) {
        dispatch(fetchCategoryById(id));
      }
      
      // תמיד נטען את תתי-הקטגוריות
      dispatch(fetchSubcategories(id));
    }
  }, [categoryId, dispatch, categoryFromState, selectedCategory]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const currentCategory = categoryFromState || selectedCategory;

  const handleSubcategorySelect = (subcategory: Subcategory) => {
    // כאן נוכל לנווט לדף הלמידה של תת-הקטגוריה
    // Log selection for debugging in development only
    if (process.env.NODE_ENV === 'development') {
      console.log('Selected subcategory:', subcategory);
    }
    // navigate(`/learn/${subcategory.id}`, { state: { subcategory, category: currentCategory } });
  };

  const handleBackToCategories = () => {
    navigate('/categories');
  };

  const handleBreadcrumbClick = (path: string) => {
    navigate(path);
  };

  if (!categoryId) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          Category ID is missing
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back Button */}
      <Box sx={{ mb: 2 }}>
        <IconButton 
          onClick={handleBackToCategories}
          sx={{ 
            border: '1px solid',
            borderColor: 'divider',
            '&:hover': {
              backgroundColor: 'action.hover'
            }
          }}
        >
          <ArrowBack />
        </IconButton>
      </Box>

      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link
          color="inherit"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleBreadcrumbClick('/dashboard');
          }}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Home sx={{ mr: 0.5 }} fontSize="inherit" />
          Dashboard
        </Link>
        <Link
          color="inherit"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleBreadcrumbClick('/categories');
          }}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <CategoryIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Categories
        </Link>
        <Typography
          color="text.primary"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <SubcategoryIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {currentCategory?.name || `Category ${categoryId}`}
        </Typography>
      </Breadcrumbs>

      {/* כותרת */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {currentCategory?.name || `Category ${categoryId}`}
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto' }}
        >
          Choose a subcategory to start your learning journey
        </Typography>
      </Box>

      {/* הצגת שגיאות */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          onClose={() => dispatch(clearError())}
        >
          {error}
        </Alert>
      )}

      {/* טעינה */}
      {status === 'loading' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={60} />
        </Box>
      )}      {/* רשת תתי-קטגוריות */}
      {status !== 'loading' && subcategories.length > 0 && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {subcategories.map((subcategory) => (
            <Box key={subcategory.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  }
                }}
              >
                <CardActionArea
                  onClick={() => handleSubcategorySelect(subcategory)}
                  sx={{ height: '100%', p: 2 }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <SubcategoryIcon 
                      sx={{ 
                        fontSize: 48, 
                        color: 'primary.main', 
                        mb: 2 
                      }} 
                    />
                    <Typography variant="h6" component="h3" gutterBottom>
                      {subcategory.name}
                    </Typography>
                    {subcategory._count && (
                      <Chip
                        label={`${subcategory._count.prompts} prompts`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    )}
                  </CardContent>                </CardActionArea>
              </Card>
            </Box>
          ))}
        </Box>
      )}

      {/* אין תתי-קטגוריות */}
      {status !== 'loading' && subcategories.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <SubcategoryIcon 
            sx={{ 
              fontSize: 80, 
              color: 'text.disabled', 
              mb: 2 
            }} 
          />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No subcategories found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This category doesn't have any subcategories yet.
          </Typography>
        </Box>
      )}

      {/* סטטיסטיקות */}
      {subcategories.length > 0 && (
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Total: {subcategories.length} subcategories with{' '}
            {subcategories.reduce((total, sub) => total + (sub._count?.prompts || 0), 0)} prompts
          </Typography>
        </Box>
      )}
    </Container>
  );
}
