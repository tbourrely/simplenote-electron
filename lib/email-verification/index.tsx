import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import EmailConfirm from './email-confirm';
import EmailVerificationRequested from './email-verification-requested';

import * as S from '../state';

const EmailVerification: FunctionComponent = () => {
  const verified: boolean | null = useSelector(
    (state: S.State) => state.account.emailVerified
  );
  // Do not show the modal if verified is null or true
  if (verified !== false) {
    return null;
  }
  const requested = useSelector(
    (state: S.State) => state.account.emailVerificationRequested
  );
  if (requested) {
    return <EmailVerificationRequested />;
  }
  return <EmailConfirm />;
};

export default EmailVerification;
