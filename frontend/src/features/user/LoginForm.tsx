import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { login, clearError } from './userSlice';

interface FormErrors {
  phone?: string;
}

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const { status, error, isAuthenticated } = useAppSelector(state => state.user);

  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^05\d{8}$/.test(phone.replace(/[-\s]/g, ''))) {
      newErrors.phone = 'Please enter a valid Israeli phone number (05xxxxxxxx)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    
    // Clear field error when user starts typing
    if (errors.phone) {
      setErrors({ phone: undefined });
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
    }
    
    const result = await dispatch(login({
      phone: phone.replace(/[-\s]/g, '')
    }));
    
    if (login.fulfilled.match(result)) {
      setPhone('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to dashboard
      console.log('User logged in successfully');
    }
  }, [isAuthenticated]);

  return (
    <div className="form-container">
      <div className="page-header">
        <h2 className="page-title">Welcome Back</h2>
        <p className="page-subtitle">Sign in to your account</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={handleChange}
            placeholder="05X-XXX-XXXX"
            className={errors.phone ? 'error' : ''}
            disabled={status === 'loading'}
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>

        <button 
          type="submit" 
          disabled={status === 'loading'}
          className={`btn btn-primary ${status === 'loading' ? 'btn-loading' : ''}`}
        >
          {status === 'loading' ? 'Signing In...' : 'Sign In'}
        </button>

        {error && <div className="error-message" style={{ marginTop: '15px' }}>{error}</div>}
        {showSuccess && (
          <div className="success-message" style={{ marginTop: '15px' }}>
            Signed in successfully!
          </div>
        )}
      </form>
      
      <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
        Don't have an account?{' '}
        <a href="/register" style={{ color: '#007bff', textDecoration: 'none' }}>
          Create one here
        </a>
      </p>
    </div>
  );
}
