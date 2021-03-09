import React, { useEffect } from 'react';

import Header from '../../Components/Header'
import Call from '../../Components/Call'
import api from '../../services/api'

import { Container } from './styles';

import { useAuth } from '../../hooks/auth'

const Calls: React.FC = () => {
  const { refreshToken } = useAuth()
  useEffect(() => {
    async function getCalls() {
      const response = await api.get('/calls')
      console.log(response.data)
    }

    getCalls()
    refreshToken()
  }, [])

  async function teste() {
    const response = await api.get('/calls')
    console.log(response.data)
  }

  return (
    <Container>
      <Header />
      <button onClick={teste}>teste</button>
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