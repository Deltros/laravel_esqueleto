import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const data = localStorage.getItem('auth')
    return data ? JSON.parse(data) : { logeado: false, token: null }
  })

  // Ahora login recibe los datos del usuario
  const login = async (credentials) => {
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })
      const data = await response.json()
      console.log('Respuesta del backend:', data)
      // Aquí podrías guardar el token si el login es exitoso
    } catch (error) {
      console.error('Error en login:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ auth, login }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext 