import React, { FormEvent, useState } from 'react';

import { useAuth } from '../../hooks/auth'

import {
  Container,
  FormContainer,
  Form
} from './styles';
import { Input, PrimaryButton } from '../../styles'

const Login: React.FC = () => {
  const { signIn } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await signIn({ username, password })
  }

  return (
    <Container color='green'>
      <div className='brand'>
        <h1>Aircall</h1>
      </div>
      <FormContainer>
        <h2>Login</h2>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder='Username'
            type='text'
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder='Password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <PrimaryButton type='submit'>Login</PrimaryButton>
        </Form>
      </FormContainer>
    </Container>
  );
}

export default Login;