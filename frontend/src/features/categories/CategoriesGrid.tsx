import React, { useState } from 'react';
import {
  TextField,
  InputAdornment,
  Box,
  Typography,
  Fade,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { Category } from './types';
import CategoryCard from './CategoryCard';

interface CategoriesGridProps {
  categories: Category[];
  onSelectCategory: (category: Category) => void;
  loading?: boolean;
}

export default function CategoriesGrid({ 
  categories, 
  onSelectCategory, 
  loading = false 
}: CategoriesGridProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // סינון קטגוריות לפי חיפוש
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.subCategories.some(sub => 
      sub.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          Loading categories...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* שורת חיפוש */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search categories or subcategories..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
          }}
          sx={{
            maxWidth: 600,
            mx: 'auto',
            display: 'block',
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
            },
          }}
        />
      </Box>

      {/* תוצאות חיפוש */}
      {searchTerm && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Found {filteredCategories.length} categories
            {searchTerm && ` matching "${searchTerm}"`}
          </Typography>
        </Box>
      )}

      {/* רשת קטגוריות */}
      {filteredCategories.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {searchTerm ? 'No categories found' : 'No categories available'}
          </Typography>
          {searchTerm && (
            <Typography variant="body2" color="text.secondary">
              Try searching with different keywords
            </Typography>
          )}
        </Box>
      ) : (        <Fade in={true} timeout={500}>
          <Box 
            sx={{ 
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
              gap: 3
            }}
          >
            {filteredCategories.map((category) => (
              <Box key={category.id}>                <CategoryCard
                  category={category}
                  onSelect={onSelectCategory}
                />
              </Box>
            ))}
          </Box>
        </Fade>
      )}
    </Box>
  );
}
