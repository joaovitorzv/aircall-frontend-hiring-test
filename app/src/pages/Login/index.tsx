import React, { useCallback } from 'react';

import {
  Container,
  FormContainer,
  Form
} from './styles';

import { Input, PrimaryButton } from '../../styles'

const Login: React.FC = () => {
  return (
    <Container color='green'>
      <div className='brand'>
        <h1>Aircall</h1>
      </div>
      <FormContainer>
        <h2>Login</h2>
        <Form>
          <Input placeholder='Email' type='email' />
          <Input placeholder='Password' type='password' />
          <PrimaryButton>Login</PrimaryButton>
        </Form>
      </FormContainer>
    </Container>
  );
}

export default Login;