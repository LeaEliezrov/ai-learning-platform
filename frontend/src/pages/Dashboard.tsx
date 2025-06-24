import React from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { logout } from '../features/user/userSlice';

export default function Dashboard() {
  const { currentUser } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="container">
      <div className="nav">
        <div className="nav-container">
          <a href="/" className="nav-brand">AI Learning Platform</a>
          <nav>
            <ul className="nav-links">
              <li>
                <span className="nav-link">Welcome, {currentUser?.name}</span>
              </li>
              <li>
                <button 
                  onClick={handleLogout} 
                  className="btn btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '14px' }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Welcome to your learning dashboard</p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px',
        marginTop: '30px'
      }}>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ marginBottom: '15px', color: '#333' }}>Profile Information</h3>
          <p><strong>Name:</strong> {currentUser?.name}</p>
          <p><strong>Phone:</strong> {currentUser?.phone}</p>
          <p><strong>Member since:</strong> {
            currentUser?.createdAt ? 
            new Date(currentUser.createdAt).toLocaleDateString() : 
            'Today'
          }</p>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ marginBottom: '15px', color: '#333' }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button className="btn btn-primary">Start Learning</button>
            <button className="btn btn-secondary">View Progress</button>
            <button className="btn btn-secondary">Settings</button>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ marginBottom: '15px', color: '#333' }}>Recent Activity</h3>
          <p style={{ color: '#666', fontStyle: 'italic' }}>
            No recent activity yet. Start learning to see your progress here!
          </p>
        </div>
      </div>
    </div>
  );
}
