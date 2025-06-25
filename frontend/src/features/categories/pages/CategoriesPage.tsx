import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Breadcrumbs,
  Link,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Home, Category as CategoryIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import type { RootState } from '../../../app/store';
import { fetchCategories, clearError } from '../categoriesSlice';
import { Category } from '../types';
import CategoriesGrid from '../CategoriesGrid';

export default function CategoriesPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categories, status, error } = useAppSelector((state: RootState) => state.categories);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleSelectCategory = (category: Category) => {
    // ניווט לדף פרטי הקטגוריה או לדף לימוד
    navigate(`/categories/${category.id}`, { state: { category } });
  };

  const handleBreadcrumbClick = (path: string) => {
    navigate(path);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          component="button"
          variant="body2"
          onClick={() => handleBreadcrumbClick('/dashboard')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'inherit',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          <Home sx={{ mr: 0.5, fontSize: 16 }} />
          Dashboard
        </Link>
        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.primary' }}>
          <CategoryIcon sx={{ mr: 0.5, fontSize: 16 }} />
          Categories
        </Box>
      </Breadcrumbs>

      {/* כותרת */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Explore Learning Categories
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto' }}
        >
          Choose from our comprehensive collection of academic subjects and start your AI-powered learning journey
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
      {status === 'loading' && categories.length === 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={60} />
        </Box>
      )}      {/* רשת קטגוריות */}
      {status !== 'loading' && (
        <CategoriesGrid
          categories={categories}
          onSelectCategory={handleSelectCategory}
          loading={false}
        />
      )}

      {/* סטטיסטיקות */}
      {categories.length > 0 && (
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Total: {categories.length} categories with{' '}
            {categories.reduce((total, cat) => total + cat._count.subCategories, 0)} subcategories
          </Typography>
        </Box>
      )}
    </Container>
  );
}
