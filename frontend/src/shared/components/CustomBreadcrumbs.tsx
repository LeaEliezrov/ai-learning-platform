import React from 'react';
import { Breadcrumbs, Link, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: React.ReactNode;
}

interface CustomBreadcrumbsProps {
  items: BreadcrumbItem[];
  sx?: object;
}

export default function CustomBreadcrumbs({ items, sx }: CustomBreadcrumbsProps) {
  const navigate = useNavigate();

  const handleClick = (path?: string) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <Box sx={{ mb: 3, ...sx }}>
      <Breadcrumbs aria-label="breadcrumb">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          if (isLast || !item.path) {
            return (
              <Typography 
                key={index} 
                color="text.primary"
                component="span"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                {item.icon && <span style={{ marginRight: '4px', display: 'inline-flex' }}>{item.icon}</span>}
                {item.label}
              </Typography>
            );
          }
          
          return (
            <Link
              key={index}
              color="inherit"
              onClick={() => handleClick(item.path)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {item.icon && <span style={{ marginRight: '4px', display: 'inline-flex' }}>{item.icon}</span>}
              {item.label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}
