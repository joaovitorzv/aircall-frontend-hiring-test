import styled from 'styled-components'

import Colors from '../../styles/theme'

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  
  .brand {
    padding: 2rem;
    text-align: center;

    h1 {
      font-size: 2.5rem;
      color: ${Colors.green};
    }
  }
`
export const FormContainer = styled.div`
  padding: 16px;
  
  h2 {
    font-size: 2rem;
  }
`

export const Form = styled.div`
  display: flex;
  flex-direction: column;

  padding: 5% 0;
  
  button {
    margin-top: 5%;
  }
`