import React, {
  createContext,
  useContext,
  useCallback,
  useReducer,
  useEffect
} from 'react';
import { useCookies } from 'react-cookie'
import axios, { AxiosResponse } from 'axios'
import api from '../services/api'

axios.interceptors.response.use(function (response: AxiosResponse) {
  // Do something before request is sent
  console.log('LOIROS')
  return response;
}, function (error) {
  console.error(error)
  console.log('loiros err')
  // Do something with request error
  return Promise.reject(error);
});

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
  refreshToken(): Promise<void>;
  logout(): void;
}

enum AuthActionKind {
  SignIn = 'SIGN_IN',
  Logout = 'LOGOUT'
}

type Action = {
  type: AuthActionKind,
  payload: AuthState
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['access_token'])

  const initAuthState = (): AuthState => {
    const access_token = cookies.access_token
    const user = localStorage.getItem('@aircall:user')

    if (access_token && user) {
      api.defaults.headers.authorization = `Bearer ${access_token}`
      return { access_token, user: JSON.parse(user) }
    }

    return {} as AuthState
  }

  function reducer(state: AuthState, action: Action): AuthState {
    const { type, payload } = action

    switch (type) {
      case AuthActionKind.SignIn:
        return {
          access_token: payload.access_token,
          user: payload.user
        }

      case AuthActionKind.Logout:
        return {} as AuthState
    }
  }

  const [state, dispatch] = useReducer(reducer, {} as AuthState, initAuthState)

  const signIn = useCallback(async ({ username, password }) => {
    const response = await api.post('/auth/login', {
      username,
      password
    })
    const { access_token, user } = response.data

    setCookie('access_token', access_token, {
      maxAge: 60 * 10
    })
    localStorage.setItem('@aircall:user', JSON.stringify(user))

    api.defaults.headers.authorization = `Bearer ${access_token}`

    dispatch({ type: AuthActionKind.SignIn, payload: { access_token, user } })
  }, [setCookie])

  const logout = useCallback(() => {
    removeCookie('access_token')
    localStorage.removeItem('@aircall:user')

    dispatch({ type: AuthActionKind.Logout, payload: {} as AuthState })
  }, [removeCookie])

  const refreshToken = useCallback(async () => {
    const fresh_token = (await api.post('/auth/refresh-token')).data.access_token

    setCookie('access_token', fresh_token, {
      maxAge: 60 * 10
    })

    api.defaults.headers.authorization = `Bearer ${fresh_token}`
  }, [setCookie])

  return (
    <AuthContext.Provider
      value={{ user: state.user, signIn, refreshToken, logout }}
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