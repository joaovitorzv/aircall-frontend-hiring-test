import React, {
  createContext,
  useContext,
  useCallback,
  useReducer
} from 'react';
import { useCookies } from 'react-cookie'
import api from '../services/api'

interface User {
  id: string;
  username: string;
}

interface AuthState {
  access_token: string;
  token_expiration: string;
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
  Logout = 'LOGOUT',
  RefreshToken = 'REFRESH_TOKEN'
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
    const token_expiration = localStorage.getItem('@aircall:txp')
    const user = localStorage.getItem('@aircall:user')

    if (access_token && user && token_expiration) {
      api.defaults.headers.authorization = `Bearer ${access_token}`
      return {
        access_token,
        token_expiration: JSON.parse(token_expiration),
        user: JSON.parse(user)
      }
    }

    return {} as AuthState
  }

  function reducer(state: AuthState, action: Action): AuthState {
    const { type, payload } = action

    switch (type) {
      case AuthActionKind.SignIn:
        return {
          access_token: payload.access_token,
          token_expiration: payload.token_expiration,
          user: payload.user
        }

      case AuthActionKind.Logout:
        return {} as AuthState

      case AuthActionKind.RefreshToken:
        return {
          ...payload,
          access_token: payload.access_token
        }
    }
  }

  const [state, dispatch] = useReducer(reducer, {} as AuthState, initAuthState)

  const signIn = useCallback(async ({ username, password }) => {
    const response = await api.post('/auth/login', {
      username,
      password
    })
    const { access_token, user } = response.data
    const token_expiration = Date.now() + 1000 * 60 * 10

    setCookie('access_token', access_token, {
      maxAge: 60 * 10
    })

    localStorage.setItem('@aircall:user', JSON.stringify(user))
    localStorage.setItem('@aircall:txp', JSON.stringify(token_expiration))

    api.defaults.headers.authorization = `Bearer ${access_token}`

    dispatch({
      type: AuthActionKind.SignIn,
      payload: { access_token, token_expiration: JSON.stringify(token_expiration), user }
    })
  }, [setCookie])

  const logout = useCallback(() => {
    removeCookie('access_token')
    localStorage.clear()

    dispatch({ type: AuthActionKind.Logout, payload: {} as AuthState })
  }, [removeCookie])

  const refreshToken = useCallback(async () => {
    if (!state.access_token) return

    const fresh_token = (await api.post('/auth/refresh-token')).data.access_token
    const token_expiration = JSON.stringify(Date.now() + 1000 * 60 * 10)

    api.defaults.headers.authorization = `Bearer ${fresh_token}`
    setCookie('access_token', fresh_token, {
      maxAge: 60 * 10
    })
    localStorage.setItem('@aircall:txp', token_expiration)

    dispatch({ type: AuthActionKind.RefreshToken, payload: { ...state, token_expiration } })
  }, [setCookie])

  /*
  * Get a fresh token when token is about 1 minute to expire
  */

  setInterval(() => {
    refreshToken()
  }, 1000 * 60 * (new Date(state.token_expiration).getMinutes() - (new Date().getMinutes() - 1)))

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
