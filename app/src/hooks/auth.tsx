import React, { createContext, useContext, useState, useCallback } from 'react';
import { useCookies } from 'react-cookie'
import api from '../services/api'

interface User {
  id: string;
  username: string;
}

interface AuthState {
  access_token: string;
  user: User;
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)


export const AuthProvider: React.FC = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['access_token'])

  const [data, setData] = useState<AuthState>(() => {
    const access_token = cookies.access_token
    const user = localStorage.getItem('@aircall:user')

    if (access_token && user) {
      api.defaults.headers.authorization = `Bearer ${access_token}`
      return { access_token, user: JSON.parse(user) }
    }

    return {} as AuthState
  })

  const signIn = useCallback(async ({ username, password }) => {
    console.log(username, password)
    const response = await api.post('/auth/login', {
      username,
      password
    })
    const { access_token, user } = response.data

    setCookie('access_token', access_token, {
      maxAge: 60 * 5
    })
    localStorage.setItem('@aircall:user', JSON.stringify(user))

    api.defaults.headers.authorization = `Bearer ${access_token}`

    setData({ access_token, user })
  }, [])

  const logout = useCallback(() => {
    removeCookie('access_token')
    localStorage.removeItem('@aircall:user')

    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}