import React, { FunctionComponent } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

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
  // @todo we have a getTheme selector but I wasn't sure how to use that here
  const theme: string = useSelector((state: S.State) =>
    state.settings.theme === 'system'
      ? state.browser.systemTheme
      : state.settings.theme
  );
  const dispatch = useDispatch();

  return (
    <Modal
      className="dialog email-verification__content theme-color-fg theme-color-bg"
      isOpen
      onRequestClose={() => dispatch(actions.ui.dismissEmailVerifyDialog())}
      contentLabel="Confirm your email"
      overlayClassName="email-verification__overlay"
      portalClassName={classNames(
        'email-verification__portal',
        'theme-' + theme
      )}
    >
      <h2>Review Your Account</h2>
      <p>You are registered with Simplenote using the email {email}. </p>
      <p>
        Improvements to account security may result in account loss if you no
        longer have access to this email address.
      </p>

      <div className="email-verification__button-row">
        <a
          target="_blank"
          rel="noreferrer"
          className="button"
          href="https://app.simplenote.com/settings"
        >
          Change Email
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          className="button button-primary"
          href={sendVerifyUrl}
        >
          Confirm
        </a>
      </div>
    </Modal>
  );
};

export default EmailConfirm;
