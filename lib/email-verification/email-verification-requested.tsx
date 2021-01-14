import React, { FunctionComponent } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

import actions from '../state/actions';

import * as S from '../state';

const EmailConfirm: FunctionComponent = () => {
  const dismissed: boolean = useSelector(
    (state: S.State) => state.ui.emailVerifyDialogDismissed
  );
  if (dismissed) {
    return null;
  }
  const email: string | null = useSelector(
    (state: S.State) => state.settings.accountName
  );
  const sendVerifyUrl: string = useSelector(
    (state: S.State) => state.account.sendEmailVerifyUrl
  );
  const dispatch = useDispatch();

  return (
    <Modal
      isOpen={true}
      onRequestClose={() => dispatch(actions.ui.dismissEmailVerifyDialog())}
      contentLabel="Confirm your email"
    >
      <h2>Verify Your Email</h2>
      <p>
        We just need you to verify your email address. An email has been sent to{' '}
        {email} with a link for verification. Happy note-ing!
      </p>

      <div>
        <a target="_blank" href={sendVerifyUrl}>
          Resend Email
        </a>
      </div>
    </Modal>
  );
};

export default EmailConfirm;
