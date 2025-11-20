import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ 
        background: '#f8f9fa', 
        padding: '2rem', 
        borderRadius: '8px',
        marginTop: '1rem'
      }}>
        <h2>Welcome, {user?.name}!</h2>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Location:</strong> {user?.location}</p>
        <p><strong>Role:</strong> {user?.role || 'Community Member'}</p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1rem', 
        marginTop: '2rem' 
      }}>
        <div style={{ padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>Quick Actions</h3>
          <ul style={{ marginTop: '1rem', listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>📝 Submit a Report</li>
            <li style={{ marginBottom: '0.5rem' }}>👀 View Reports</li>
            <li style={{ marginBottom: '0.5rem' }}>🚨 Report to Police</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;