import React from 'react'

import { Container } from './styles'
import { Anchor } from '../../styles'

const TopTabs: React.FC = () => {
  return (
    <Container>
      <ul>
        <li className='active'>
          <Anchor to='/calls' >Calls</Anchor>
          <div className="tabBorder" />
        </li>
        <li>
          <Anchor to='/calls'>Missed</Anchor>
        </li>
      </ul>
    </Container>
  );
}

export default TopTabs