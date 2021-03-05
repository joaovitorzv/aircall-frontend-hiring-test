import styled from 'styled-components';
import Colors from '../../styles/theme'

type Props = {
  isVisible: boolean;
}

export const Container = styled.div`
  padding: 10px;

  button {
    width: 100%;
    background-color: ${Colors.error};
  }
  
  display: ${(props: Props) => props.isVisible ? 'block' : 'none'};
`;
