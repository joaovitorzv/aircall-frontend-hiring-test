import React from 'react'
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect
} from 'react-router-dom'

import { useAuth } from '../hooks/auth'

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean,
  component: React.ComponentType
}

const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { user } = useAuth()

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return user ? (
          <Component />
        ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: location }
              }}
            />
          );
      }}
    />
  )
}

export default PrivateRoute