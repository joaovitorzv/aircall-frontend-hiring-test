import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`

export const HeaderInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`

export const HeaderTitle = styled.div`
  h2 {
    font-size: 2.5rem;
  }
`
export const HeaderActions = styled.div`
  svg:not(:nth-child(1)) {
    margin-left: 20px;
  }
`