import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ children }) {
  const auth = useAuth();
  console.log('ProtectedRoute useAuth:', auth);
  if (!auth) {
    // Contexto no disponible, muestra un mensaje o null
    return <div>Contexto de autenticación no disponible</div>;
  }
  const { token } = auth;
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
} 