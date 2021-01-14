import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import EmailConfirm from './email-confirm';
import EmailVefrificationRequested from './email-verification-requested';

import * as S from '../state';

const EmailVerification: FunctionComponent = () => {
  const verified: boolean | undefined = useSelector(
    (state: S.State) => state.account.emailVerified
  );
  // Do no show the banner if verified is undefined or true
  if (verified !== false) {
    return null;
  }
  const requested = useSelector(
    (state: S.State) => state.account.emailVerificationRequested
  );
  if (requested) {
    return <EmailVefrificationRequested />;
  }
  return <EmailConfirm />;
};

export default EmailVerification;
