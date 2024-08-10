import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();

  useEffect(() => {
    
  }, [user]);

  if (!user) {
    return (
      <div className="profile-container">
        <div className="login-prompt">
          <h1>Access Denied</h1>
          <p>You need to log in to view your profile.</p>
          <a href="/login" className="login-link">Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-title">Hello, {user.username}!</h1>
        <p className="profile-email">Email: {user.email}</p>
      </div>
      <div className="profile-actions">
        <button className="logout-button" onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
