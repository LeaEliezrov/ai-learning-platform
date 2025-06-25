import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import { LoginOutlined, PersonOutline, PhoneOutlined } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { login, clearError } from './userSlice';

interface FormErrors {
  name?: string;
  phone?: string;
}

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, error, isAuthenticated } = useAppSelector(state => state.user);  const [form, setForm] = useState({ name: '', phone: '' });
  const [errors, setErrors] = useState<FormErrors>({});

  // Format phone number as user types
  const formatPhoneNumber = (value: string): string => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format as 05X-XXX-XXXX
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (!phoneDigits) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^05\d{8}$/.test(phoneDigits)) {
      newErrors.phone = 'Please enter a valid Israeli phone number (05xxxxxxxx)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Format phone number and limit to 10 digits
      const digits = value.replace(/\D/g, '');
      if (digits.length <= 10) {
        const formattedPhone = formatPhoneNumber(digits);
        setForm(prev => ({ ...prev, [name]: formattedPhone }));
      }
    } else if (name === 'name') {
      // Capitalize first letters and clean input
      const cleanName = value.replace(/[^א-ת\s\w]/g, '');
      setForm(prev => ({ ...prev, [name]: cleanName }));
    }
    
    // Clear field error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    
    // Clear global error
    if (error) {
      dispatch(clearError());
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }    const result = await dispatch(login({
      name: form.name.trim(),
      phone: form.phone.replace(/\D/g, '') // Send only digits
    }));
    
    if (login.fulfilled.match(result)) {
      navigate('/dashboard');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 3,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 400,
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <LoginOutlined color="primary" sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sign in to your account
            </Typography>
          </Box>          <Box component="form" onSubmit={handleSubmit}>            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name || 'Enter your full name as registered'}
              disabled={status === 'loading'}
              autoComplete="name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutline color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="05X-XXX-XXXX"
              error={!!errors.phone}
              helperText={errors.phone || 'Enter your registered phone number'}
              disabled={status === 'loading'}
              autoComplete="tel"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneOutlined color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={status === 'loading'}
              startIcon={status === 'loading' ? <CircularProgress size={20} /> : undefined}
              sx={{ mb: 2 }}
            >
              {status === 'loading' ? 'Signing In...' : 'Sign In'}
            </Button>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Typography variant="body2" align="center" color="text.secondary">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                style={{ 
                  color: 'inherit', 
                  fontWeight: 500 
                }}
              >
                Create one here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
