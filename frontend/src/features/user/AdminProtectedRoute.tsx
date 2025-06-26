import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { Notification } from '../../shared/components';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export default function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const { isAuthenticated, currentUser } = useAppSelector(state => state.user);

  // אם המשתמש לא מחובר, נווט לדף הכניסה
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // אם המשתמש מחובר אבל אינו אדמין, הצג הודעה ונווט לדשבורד הרגיל
  if (currentUser?.role !== 'ADMIN') {
    return (
      <>
        <Notification
          message="Access denied: Admin privileges required"
          type="error"
          duration={3000}
        />
        <Navigate to="/dashboard" replace />
      </>
    );
  }

  // אם המשתמש הוא אדמין, הצג את הרכיב
  return <>{children}</>;
}
