import React from 'react'
import HeaderTabs from '../HeaderTabs'

import { FaSearch, FaUser } from 'react-icons/fa'

import { useAuth } from '../../hooks/auth'

import {
  Container,
  HeaderInfo,
  HeaderTitle,
  HeaderActions
} from './styles'
import Colors from '../../styles/theme'

const Header: React.FC = () => {
  const { user } = useAuth()

  return (
    <Container>
      <HeaderInfo>
        <HeaderTitle>
          <h2>{user.username}</h2>
        </HeaderTitle>

        <HeaderActions>
          <FaSearch size={22} color={Colors.green} />
          <FaUser size={22} color={Colors.green} />
        </HeaderActions>
      </HeaderInfo>

      <HeaderTabs />
    </Container>
  );
}

export default Header;