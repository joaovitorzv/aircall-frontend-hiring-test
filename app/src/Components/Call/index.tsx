import React from 'react'

import {
  HiPhoneIncoming,
  HiPhoneMissedCall,
  HiPhoneOutgoing
} from 'react-icons/hi'

import { Container } from './styles'

interface Props {
  callStatus: 'MISSED' | 'INCOMING' | 'OUTGOIND'
}

const Call: React.FC<Props> = ({ callStatus }) => {
  return (
    <Container callStatus={callStatus}>
      <div className='avatar' />
      <div className='callInfo'>
        <p className='time'>23:12</p>
        <h3>Leticia</h3>
        <div className='callStatus'>
          {callStatus === 'INCOMING' && (<HiPhoneIncoming />)}
          {callStatus === 'MISSED' && (<HiPhoneMissedCall />)}
          {callStatus === 'OUTGOIND' && (<HiPhoneOutgoing />)}
          <p>{callStatus} (43 sec)</p>
        </div>
      </div>
    </Container>
  );
}

export default Call