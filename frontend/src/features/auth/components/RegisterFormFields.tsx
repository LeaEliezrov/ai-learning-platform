import React from 'react';
import { Box } from '@mui/material';
import { PersonOutline, PhoneOutlined, PersonAddOutlined } from '@mui/icons-material';
import { FormField, SubmitButton } from '../../../shared/components';

interface RegisterFormFieldsProps {
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

export default function RegisterFormFields({ 
  values, 
  errors, 
  handleFieldChange, 
  onSubmit, 
  loading 
}: RegisterFormFieldsProps) {
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
        startIcon={<PersonAddOutlined />}
      >
        Create Account
      </SubmitButton>
    </Box>
  );
}
