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
      <h2>Verify Your Email</h2>
      <p>
        We just need you to verify your email address. An email has been sent to{' '}
        {email} with a link for verification. Happy note-ing!
      </p>

      <div className="email-verification__button-row">
        <a
          className="button button-primary"
          target="_blank"
          rel="noreferrer"
          href={sendVerifyUrl}
        >
          Resend Email
        </a>
      </div>
    </Modal>
  );
};

export default EmailConfirm;
