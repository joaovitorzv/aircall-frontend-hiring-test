import React from 'react';

import { useAuth } from '../../hooks/auth'

import { Container } from './styles';
import { PrimaryButton } from '../../styles'

interface Props {
  showUserSettings: boolean;
}

const UserSettings: React.FC<Props> = ({ showUserSettings }) => {
  const { logout } = useAuth()

  return (
    <Container isVisible={showUserSettings}>
      <PrimaryButton onClick={logout}>Logout</PrimaryButton>
    </Container>
  );
}

export default UserSettings;