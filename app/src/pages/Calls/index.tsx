import React from 'react';

import Header from '../../Components/Header'
import Call from '../../Components/Call'

import { Container } from './styles';

const Calls: React.FC = () => {
  return (
    <Container>
      <Header />
      <div className='calls-container'>
        <Call callStatus='INCOMING' />
        <Call callStatus='MISSED' />
        <Call callStatus='MISSED' />
        <Call callStatus='OUTGOIND' />
      </div>
    </Container>
  )
}

export default Calls;