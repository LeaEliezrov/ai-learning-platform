import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Breadcrumbs,
  Link,
  Alert,
} from '@mui/material';
import { Home } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchCategories } from './categoriesSlice';
import { Category } from './types';
import CategoriesGrid from './CategoriesGrid';

export default function CategoriesPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categories, status, error } = useAppSelector(state => state.categories);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const handleSelectCategory = (category: Category) => {
    // עבור עכשיו נדפיס לקונסול, אחר כך נוסיף navigation לדף פרטי קטגוריה
    console.log('Selected category:', category);
    // navigate(`/categories/${category.id}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link
          color="inherit"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate('/dashboard');
          }}
          sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
        >
          <Home sx={{ mr: 0.5 }} fontSize="inherit" />
          Dashboard
        </Link>
        <Typography color="text.primary">Categories</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
          }}
        >
          📚 Learning Categories
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto' }}
        >
          Explore our comprehensive collection of academic subjects and find the perfect learning path for your goals.
        </Typography>
      </Box>

      {/* Error handling */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Categories Grid */}
      <CategoriesGrid
        categories={categories}
        onSelectCategory={handleSelectCategory}
        loading={status === 'loading'}
      />

      {/* Stats */}
      {categories.length > 0 && (
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Showing {categories.length} categories with{' '}
            {categories.reduce((total, cat) => total + cat._count.subCategories, 0)} subcategories
          </Typography>
        </Box>
      )}
    </Container>
  );
}
