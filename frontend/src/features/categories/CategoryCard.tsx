import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  CardActionArea,
} from '@mui/material';
import { Category } from './types';

interface CategoryCardProps {
  category: Category;
  onSelect: (category: Category) => void;
}

// מפת אייקונים לקטגוריות
const getCategoryIcon = (categoryName: string): string => {
  const icons: { [key: string]: string } = {
    'Mathematics': '🔢',
    'Computer Science': '💻',
    'Physics': '⚛️',
    'Chemistry': '🧪',
    'Biology': '🧬',
    'Engineering': '⚙️',
    'Business & Economics': '📊',
    'Languages & Literature': '📚',
    'Social Sciences': '👥',
    'History & Humanities': '🏛️',
    'Medicine & Health Sciences': '⚕️',
    'Arts & Design': '🎨',
    'Environmental Sciences': '🌱',
    'Law & Legal Studies': '⚖️',
    'Education & Pedagogy': '🎓',
  };
  return icons[categoryName] || '📝';
};

// מפת צבעים לקטגוריות
const getCategoryColor = (categoryName: string): string => {
  const colors: { [key: string]: string } = {
    'Mathematics': '#1976d2',
    'Computer Science': '#2e7d32',
    'Physics': '#7b1fa2',
    'Chemistry': '#f57f17',
    'Biology': '#388e3c',
    'Engineering': '#455a64',
    'Business & Economics': '#e65100',
    'Languages & Literature': '#c2185b',
    'Social Sciences': '#5e35b1',
    'History & Humanities': '#8d6e63',
    'Medicine & Health Sciences': '#d32f2f',
    'Arts & Design': '#f06292',
    'Environmental Sciences': '#689f38',
    'Law & Legal Studies': '#424242',
    'Education & Pedagogy': '#1565c0',
  };
  return colors[categoryName] || '#1976d2';
};

export default function CategoryCard({ category, onSelect }: CategoryCardProps) {
  const icon = getCategoryIcon(category.name);
  const color = getCategoryColor(category.name);

  return (    <Card
      sx={{
        height: '100%',
        transition: 'all 0.3s ease-in-out',
        border: `2px solid transparent`,
        '&:hover': {
          border: `2px solid ${color}`,
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea 
        onClick={() => onSelect(category)}
        sx={{ height: '100%', p: 2 }}
      >
        <CardContent sx={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* אייקון */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="h1" sx={{ fontSize: '3rem', mb: 1 }}>
              {icon}
            </Typography>
          </Box>

          {/* שם הקטגוריה */}
          <Typography 
            variant="h6" 
            component="h3" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              color: color,
              minHeight: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            {category.name}
          </Typography>

          {/* סטטיסטיקות */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              label={`${category._count.subCategories} Subcategories`}
              size="small"
              sx={{
                backgroundColor: `${color}15`,
                color: color,
                fontWeight: 500,
              }}
            />
            {category._count.prompts > 0 && (
              <Chip
                label={`${category._count.prompts} Prompts`}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: color,
                  color: color,
                }}
              />
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
