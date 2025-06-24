import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setUser } from '../features/user/userSlice';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
// import Dashboard from '../pages/Dashboard';
// import ProtectedRoute from '../components/ProtectedRoute';

export default function AppRoutes() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(state => state.user);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Token validation logic
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      {/* דוגמא לנתיב מוגן */}
      {/* <Route path="/protected" element={<ProtectedRoute><ProtectedPage /></ProtectedRoute>} /> */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
