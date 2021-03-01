import styled, { createGlobalStyle } from 'styled-components'

import { color } from 'styled-system'

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    outline: none;
    box-sizing: border-box;

    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
  }
`

export const Box = styled.div`
  ${color}
`
