import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Index() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div style={{ padding: 32 }}>
      <h1>Bienvenido{user ? `, ${user.name}` : ''}!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
} 