import React, { useState } from 'react'
import { FaSearch, FaUser } from 'react-icons/fa'

import { useAuth } from '../../hooks/auth'

import HeaderTabs from '../HeaderTabs'
import UserSettings from '../UserSettings'
import {
  Container,
  HeaderInfo,
  HeaderTitle,
  HeaderActions
} from './styles'
import { IconButton } from '../../styles'
import Colors from '../../styles/theme'

const Header: React.FC = () => {
  const { user } = useAuth()

  const [showUserSettings, setShowUserSettings] = useState(false)

  return (
    <Container>
      <HeaderInfo>
        <HeaderTitle>
          <h2>{user.username}</h2>
        </HeaderTitle>

        <HeaderActions>
          <FaSearch size={22} color={Colors.green} />
          <IconButton onClick={() => setShowUserSettings(!showUserSettings)}>
            <FaUser size={22} color={Colors.green} />
          </IconButton>
        </HeaderActions>
      </HeaderInfo>
      <UserSettings showUserSettings={showUserSettings} />
      <HeaderTabs />
    </Container>
  );
}

export default Header;