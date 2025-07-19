import { createContext, useContext, useState, useEffect } from 'react';
import { fetchApi } from '../api/fetchApi';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));

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

  const logout = async () => {
    try {
      await fetchApi('api/logout', {}, { method: 'POST', token });
    } catch (e) {
      // Ignorar errores de logout (por ejemplo, si el token ya no es válido)
    }
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