import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { Home, Category as CategoryIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import type { RootState } from '../../../app/store';
import { fetchCategories, clearError } from '../categoriesSlice';
import { Category } from '../types';
import CategoriesGrid from '../CategoriesGrid';
import { PageHeader, CustomBreadcrumbs, ErrorAlert, LoadingCard } from '../../../shared/components';

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
    navigate(`/categories/${category.id}`, { state: { category } });
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <Home sx={{ fontSize: 16 }} /> },
    { label: 'Categories', icon: <CategoryIcon sx={{ fontSize: 16 }} /> },
  ];

  const isLoading = status === 'loading' && categories.length === 0;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <CustomBreadcrumbs items={breadcrumbItems} />

      {/* Page Header */}
      <PageHeader 
        title="Explore Learning Categories"
        subtitle="Choose from our comprehensive collection of academic subjects and start your AI-powered learning journey"
      />

      {/* Error Alert */}
      <ErrorAlert 
        error={error} 
        onClose={() => dispatch(clearError())} 
      />

      {/* Loading or Content */}
      {isLoading ? (
        <LoadingCard message="Loading categories..." />
      ) : (
        <>
          <CategoriesGrid
            categories={categories}
            onSelectCategory={handleSelectCategory}
            loading={false}
          />
          
          {/* Statistics */}
          {categories.length > 0 && (
            <div style={{ marginTop: '48px', textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Total: {categories.length} categories with{' '}
                {categories.reduce((total, cat) => total + cat._count.subCategories, 0)} subcategories
              </Typography>
            </div>
          )}
        </>
      )}
    </Container>
  );
}
