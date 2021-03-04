import styled from 'styled-components';

import Colors from '../../styles/theme'

type Props = {
  callStatus: 'INCOMING' | 'MISSED' | 'OUTGOIND'
}

export const Container = styled.div`
  width: 100%;
  border-bottom: 2px solid ${Colors.line};
  padding: 15px 20px;

  display: flex;
  align-items: center;

  .avatar {
    width: 50px;
    height: 50px;
    background-color: ${Colors.line};
    border-radius: 25px;
    margin-right: 15px;
  }
  
  .callInfo {
    p {
      color: ${Colors.secondary}
    }

    .time {
      position: absolute;
      right: 20px;
    }

    .callStatus {
      display: flex;
      align-items: center;

      p {
        text-transform: lowercase;
      }

      svg {
        margin-right: 10px;
        fill: ${(Props: Props) => Props.callStatus === 'MISSED' ? Colors.error : Colors.success}
      }
    }
  }

`;
