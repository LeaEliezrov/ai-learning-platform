import React from 'react';
import { useAppSelector } from '../app/hooks';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, status } = useAppSelector(state => state.user);

  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  // If not authenticated, show fallback or redirect
  if (!isAuthenticated) {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <div className="container">
        <div className="page-header">
          <h2 className="page-title">Access Denied</h2>
          <p className="page-subtitle">Please sign in to access this page</p>
        </div>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <a href="/login" className="btn btn-primary">Sign In</a>
          <span style={{ margin: '0 15px', color: '#666' }}>or</span>
          <a href="/register" className="btn btn-secondary">Create Account</a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
