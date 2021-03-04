import styled from 'styled-components';

import Colors from '../../styles/theme'

export const Container = styled.div`
  width: 100%;
  margin-top: 3%;

  ul {
    display: flex;
    list-style: none;
    border-bottom: 2px solid ${Colors.line};

    padding: 0 20px; 
    position: relative;

    li {
      position: unset;
      padding: 10px;
      position:relative;
    }

    li:not(:nth-child(1)) {
      margin-left: 20px;
    }
  }

  .tabBorder {
    background-color: ${Colors.green};
    width: 100%;
    height: 2px;
    left: 0px;

    position: absolute;
    margin-top: 10px;
  }

  .active {
    a {
      color: ${Colors.green};
    }
  }
`
