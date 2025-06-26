import React from 'react';
import { Button, CircularProgress } from '@mui/material';

interface SubmitButtonProps {
  loading: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export default function SubmitButton({
  loading,
  disabled = false,
  children,
  variant = 'contained',
  color = 'primary',
  fullWidth = true,
  size = 'large',
  startIcon,
  endIcon,
  onClick,
  type = 'submit',
}: SubmitButtonProps) {
  return (
    <Button
      type={type}
      fullWidth={fullWidth}
      variant={variant}
      color={color}
      size={size}
      disabled={loading || disabled}
      startIcon={loading ? <CircularProgress size={20} /> : startIcon}
      endIcon={!loading ? endIcon : undefined}
      onClick={onClick}
      sx={{ mt: 2, mb: 2 }}
    >
      {loading ? 'Processing...' : children}
    </Button>
  );
}
