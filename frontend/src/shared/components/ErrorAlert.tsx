import React from 'react';
import { Alert, AlertProps } from '@mui/material';

interface ErrorAlertProps extends Omit<AlertProps, 'severity'> {
  error: string | null;
  onClose?: () => void;
}

export default function ErrorAlert({ error, onClose, ...props }: ErrorAlertProps) {
  if (!error) return null;

  return (
    <Alert 
      severity="error" 
      onClose={onClose}
      sx={{ mb: 2 }}
      {...props}
    >
      {error}
    </Alert>
  );
}
