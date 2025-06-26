import React from 'react';
import { Box } from '@mui/material';
import { PersonOutline, PhoneOutlined } from '@mui/icons-material';
import { FormField, SubmitButton } from '../../../shared/components';
import { LoginOutlined } from '@mui/icons-material';

interface LoginFormFieldsProps {
  values: {
    name: string;
    phone: string;
  };
  errors: {
    name?: string;
    phone?: string;
  };
  handleFieldChange: (name: 'name' | 'phone') => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export default function LoginFormFields({ 
  values, 
  errors, 
  handleFieldChange, 
  onSubmit, 
  loading 
}: LoginFormFieldsProps) {
  return (
    <Box component="form" onSubmit={onSubmit} sx={{ width: '100%' }}>
      <FormField
        label="Full Name"
        name="name"
        value={values.name}
        onChange={handleFieldChange('name')}
        error={errors.name}
        icon={<PersonOutline />}
        placeholder="Enter your full name"
        required
      />

      <FormField
        label="Phone Number"
        name="phone"
        value={values.phone}
        onChange={handleFieldChange('phone')}
        error={errors.phone}
        icon={<PhoneOutlined />}
        placeholder="05X-XXX-XXXX"
        required
      />

      <SubmitButton
        loading={loading}
        startIcon={<LoginOutlined />}
      >
        Sign In
      </SubmitButton>
    </Box>
  );
}
