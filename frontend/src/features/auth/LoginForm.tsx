import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Alert, Container } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { login, clearError } from '../user/userSlice';
import { formatPhoneNumber, validatePhoneNumber, validateName } from '../../shared/utils';
import { useForm } from '../../shared/hooks/useForm';
import { 
  LoginFormHeader, 
  LoginFormFields, 
  LoginFormFooter 
} from './components';

interface LoginFormData {
  name: string;
  phone: string;
}

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, error, isAuthenticated } = useAppSelector(state => state.user);

  // Form state management with validation
  const {
    values,
    errors,
    setValue,
    validateAll,
  } = useForm({
    initialValues: { name: '', phone: '' },
    validationRules: {
      name: { custom: (value) => validateName(value) },
      phone: { custom: (value) => validatePhoneNumber(value) },
    }
  });

  // Handle form field changes
  const handleFieldChange = (name: keyof LoginFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Format phone number as user types
    if (name === 'phone') {
      value = formatPhoneNumber(value);
    }
    
    setValue(name, value);
    
    // Clear global error when user types
    if (error) {
      dispatch(clearError());
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAll()) {
      return;
    }

    const result = await dispatch(login({
      name: values.name.trim(),
      phone: values.phone.replace(/\D/g, '') // Send only digits
    }));

    if (login.fulfilled.match(result)) {
      navigate('/dashboard');
    }
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            width: '100%',
          }}
        >
          <LoginFormHeader />
          
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <LoginFormFields
            values={values as { name: string; phone: string; }}
            errors={errors}
            handleFieldChange={handleFieldChange}
            onSubmit={handleSubmit}
            loading={status === 'loading'}
          />
          
          <LoginFormFooter />
        </Paper>
      </Box>
    </Container>
  );
}
