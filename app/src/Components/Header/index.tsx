import React from 'react'
import HeaderTabs from '../HeaderTabs'

import { FaSearch, FaPlus } from 'react-icons/fa'

import {
  Container,
  HeaderInfo,
  HeaderTitle,
  HeaderActions
} from './styles'
import Colors from '../../styles/theme'

const Header: React.FC = () => {
  return (
    <Container>
      <HeaderInfo>
        <HeaderTitle>
          <h2>Calls</h2>
        </HeaderTitle>

        <HeaderActions>
          <FaSearch size={22} color={Colors.green} />
          <FaPlus size={22} color={Colors.green} />
        </HeaderActions>
      </HeaderInfo>

      <HeaderTabs />
    </Container>
  );
}

export default Header;