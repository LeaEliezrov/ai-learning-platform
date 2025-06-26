import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from '@mui/material';
import { Category as CategoryIcon } from '@mui/icons-material';

interface Category {
  id: number;
  name: string;
  subcategories?: Subcategory[];
}

interface Subcategory {
  id: number;
  name: string;
  categoryId: number;
}

interface CategorySelectorProps {
  categories: Category[];
  selectedCategoryId: string;
  selectedSubcategoryId: string;
  onCategoryChange: (categoryId: string) => void;
  onSubcategoryChange: (subcategoryId: string) => void;
  availableSubcategories: Subcategory[];
  disabled?: boolean;
}

export default function CategorySelector({
  categories,
  selectedCategoryId,
  selectedSubcategoryId,
  onCategoryChange,
  onSubcategoryChange,
  availableSubcategories,
  disabled = false,
}: CategorySelectorProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <CategoryIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" component="h2">
          Select Learning Topic
        </Typography>
      </Box>

      {/* Category Selection */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          value={selectedCategoryId}
          label="Category"
          onChange={(e) => onCategoryChange(e.target.value)}
          disabled={disabled}
        >
          <MenuItem value="">
            <em>Choose a category</em>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id.toString()}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Subcategory Selection */}
      <FormControl fullWidth disabled={!selectedCategoryId || disabled}>
        <InputLabel id="subcategory-label">Subcategory</InputLabel>
        <Select
          labelId="subcategory-label"
          value={selectedSubcategoryId}
          label="Subcategory"
          onChange={(e) => onSubcategoryChange(e.target.value)}
        >
          <MenuItem value="">
            <em>Choose a subcategory</em>
          </MenuItem>
          {availableSubcategories.map((subcategory) => (
            <MenuItem key={subcategory.id} value={subcategory.id.toString()}>
              {subcategory.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
