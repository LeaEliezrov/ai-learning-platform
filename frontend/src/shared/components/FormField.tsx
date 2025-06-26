import React from 'react';
import { TextField, InputAdornment } from '@mui/material';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  icon,
  placeholder,
  multiline = false,
  rows,
  required = false,
  disabled = false,
  fullWidth = true,
}: FormFieldProps) {
  return (
    <TextField
      fullWidth={fullWidth}
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      error={Boolean(error)}
      helperText={error}
      placeholder={placeholder}
      multiline={multiline}
      rows={rows}
      required={required}
      disabled={disabled}
      InputProps={{
        startAdornment: icon ? (
          <InputAdornment position="start">
            {icon}
          </InputAdornment>
        ) : undefined,
      }}
      sx={{ mb: 2 }}
    />
  );
}
