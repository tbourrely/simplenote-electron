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
      <h2>Review Your Account</h2>
      <p>You are registered with Simplenote using the email {email}. </p>
      <p>
        Improvements to account security may result in account loss if you no
        longer have access to this email address.
      </p>

      <div>
        <a target="_blank" href="https://app.simplenote.com/settings">
          Change Email
        </a>
        <a target="_blank" className="button" href={sendVerifyUrl}>
          Confirm
        </a>
      </div>
    </Modal>
  );
};

export default EmailConfirm;
