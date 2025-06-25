import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setUser } from '../features/user/userSlice';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import CategoriesPage from '../features/categories/pages/CategoriesPage';
import CategoryDetailsPage from '../features/categories/pages/CategoryDetailsPage';
import PromptSubmissionPage from '../features/prompts/pages/PromptSubmissionPage';
import LearningHistoryPage from '../features/prompts/pages/LearningHistoryPage';
import ProtectedRoute from '../features/user/ProtectedRoute';
export default function AppRoutes() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isInitialized } = useAppSelector(state => state.user);  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const userName = localStorage.getItem('userName');
      const userPhone = localStorage.getItem('userPhone');
      
      console.log('🔍 AppRoutes useEffect:', { token, userName, userPhone });
      
      // ✅ בדיקה שהערכים אמיתיים ולא המחרוזת 'undefined'
      if (token && token !== 'undefined' && token !== 'null' && 
          userName && userName !== 'undefined' && userName !== 'null' && 
          userPhone && userPhone !== 'undefined' && userPhone !== 'null') {
        
        console.log('✅ Valid user data found, restoring user');
        dispatch(setUser({
          id: 1, // זמני - צריך לקרוא מהשרת
          name: userName,
          phone: userPhone
        }));
      } else {
        console.log('❌ Invalid or missing user data, clearing localStorage');
        // נקה localStorage במקרה של נתונים לא תקינים
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userPhone');
      }
    } catch (error) {
      console.error('❌ Error in AppRoutes useEffect:', error);
      // נקה localStorage במקרה של בעיה
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('userPhone');
    }
  }, [dispatch]);  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />      <Route 
        path="/categories" 
        element={
          <ProtectedRoute>
            <CategoriesPage />
          </ProtectedRoute>
        } 
      />      <Route 
        path="/categories/:categoryId" 
        element={
          <ProtectedRoute>
            <CategoryDetailsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/prompts" 
        element={
          <ProtectedRoute>
            <PromptSubmissionPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/history" 
        element={
          <ProtectedRoute>
            <LearningHistoryPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/" 
        element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        } 
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
