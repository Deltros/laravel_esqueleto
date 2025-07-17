import { createContext, useContext, useState, useEffect } from 'react';
import { fetchApi } from '../api/fetchApi';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Al iniciar, revisa si hay token guardado
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      // Opcional: podrías hacer un fetch para obtener el usuario con ese token
    }
  }, []);

  const login = async (credentials) => {
    const response = await fetchApi('api/login', credentials);
    const data = await response.json();
    if (response.ok && data.token) {
      setToken(data.token);
      localStorage.setItem('token', data.token);
      setUser(data.user); // si el backend devuelve el usuario
    }
    return data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 