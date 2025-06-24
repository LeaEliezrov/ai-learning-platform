import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { register, clearError } from './userSlice';
import styles from './UserForm.module.css';

interface FormErrors {
  name?: string;
  phone?: string;
}

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const { status, error, isAuthenticated } = useAppSelector(state => state.user);

  const [form, setForm] = useState({ name: '', phone: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^05\d{8}$/.test(form.phone.replace(/[-\s]/g, ''))) {
      newErrors.phone = 'Please enter a valid Israeli phone number (05xxxxxxxx)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
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
    }
    
    const result = await dispatch(register({
      name: form.name.trim(),
      phone: form.phone.replace(/[-\s]/g, '')
    }));
    
    if (register.fulfilled.match(result)) {
      setForm({ name: '', phone: '' });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to dashboard or show success message
      console.log('User registered and authenticated successfully');
    }
  }, [isAuthenticated]);

  return (
    <div className="form-container">
      <div className="page-header">
        <h2 className="page-title">Create Account</h2>
        <p className="page-subtitle">Join our AI learning platform</p>
      </div>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={errors.name ? 'error' : ''}
            disabled={status === 'loading'}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="05X-XXX-XXXX"
            className={errors.phone ? 'error' : ''}
            disabled={status === 'loading'}
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={status === 'loading'}
          className={`btn btn-primary ${status === 'loading' ? 'btn-loading' : ''}`}
        >
          {status === 'loading' ? 'Creating Account...' : 'Create Account'}
        </button>

        {error && <div className="error-message" style={{ marginTop: '15px' }}>{error}</div>}
        {showSuccess && (
          <div className="success-message" style={{ marginTop: '15px' }}>
            Account created successfully!
          </div>
        )}
      </form>
      
      <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
        Already have an account?{' '}
        <a href="/login" style={{ color: '#007bff', textDecoration: 'none' }}>
          Sign in here
        </a>
      </p>
    </div>
  );
}
