import React from 'react'
import { Switch } from 'react-router-dom'

import PrivateRoute from './privateRoute'
import PublicRoute from './publicRoute'

import Login from '../Pages/Login'
import Calls from '../Pages/Calls'

const Routes: React.FC = () => {
  return (
    <Switch>
      <PublicRoute path='/' component={Login} isRestricted exact />

      <PrivateRoute path='/calls' component={Calls} />
    </Switch>
  )
}

export default Routes