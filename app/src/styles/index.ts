import { Link } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import Colors from './theme'

import { color } from 'styled-system'

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    outline: none;
    box-sizing: border-box;

    font-family: 'Lato', sans-serif;
  }
`

export const Box = styled.div`
  ${color}
`
export const Input = styled.input`
  border: 3px solid ${Colors.green};
  font-size: 1.4rem;
  margin-bottom: 8px;
  border-radius: 8px;
  padding: 10px;
`

export const PrimaryButton = styled.button`
  background-color: ${Colors.green};
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  text-align: center;
  border-radius: 8px;
  border: none;
`

export const Anchor = styled(Link)`
  color: ${Colors.secondary};
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
`
export const IconButton = styled.button`
  border: none;
  background-color: transparent;
`