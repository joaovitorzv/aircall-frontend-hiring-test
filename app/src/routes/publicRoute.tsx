import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect
} from 'react-router-dom'

interface RouteProps extends ReactDOMRouteProps {
  isRestricted: boolean,
  component: React.ComponentType
}

const PublicRoute: React.FC<RouteProps> = ({
  component: Component,
  isRestricted = false,
  ...rest
}) => {
  const user = 'joao'

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isRestricted && !!user ? (
          <Redirect to={{
            pathname: '/calls',
            state: { from: location }
          }} />
        ) : (
            <Component />
          )
      }}
    />
  )
}

export default PublicRoute;