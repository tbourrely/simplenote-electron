import React, { Fragment, FunctionComponent } from 'react';
import classNames from 'classnames';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

import CrossIcon from '../icons/cross';
import MailIcon from '../icons/mail';
import WarningIcon from '../icons/warning';

import actions from '../state/actions';

import * as S from '../state';

const EmailVerification: FunctionComponent = () => {
  const verified: boolean | null = useSelector(
    (state: S.State) => state.account.emailVerified
  );
  // Do not show the modal if verified is null or true
  if (verified !== false) {
    return null;
  }
  const requested: boolean | null = useSelector(
    (state: S.State) => state.account.emailVerificationRequested
  );
  if (requested === null) {
    return null;
  }

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

  const dismissDialog = () => dispatch(actions.ui.dismissEmailVerifyDialog());

  const displayClose = (
    <div
      type="button"
      aria-label="Close dialog"
      className="email-verification__dismiss"
      onClick={dismissDialog}
    >
      <CrossIcon />
    </div>
  );

  const displayEmailConfirm = (
    <Fragment>
      {displayClose}
      <WarningIcon />
      <h2>Review Your Account</h2>
      <p>
        You are registered with Simplenote using the email{' '}
        <strong>{email}</strong>.
      </p>
      <p>
        Improvements to account security may result in account loss if you no
        longer have access to this email address.
      </p>

      <div className="email-verification__button-row">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://app.simplenote.com/settings"
        >
          Change Email
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          className="email-verification__button"
          href={sendVerifyUrl}
        >
          Confirm
        </a>
      </div>
    </Fragment>
  );

  const displayEmailRequested = (
    <Fragment>
      {displayClose}
      <MailIcon />
      <h2>Verify Your Email</h2>
      <p>
        We just need you to verify your email address. An email has been sent to{' '}
        <strong>{email}</strong> with a link for verification. Happy note-ing!
      </p>

      <div className="email-verification__button-row">
        <a target="_blank" rel="noreferrer" href={sendVerifyUrl}>
          Resend Email
        </a>
      </div>
    </Fragment>
  );
  return (
    <Modal
      className="email-verification__modal"
      isOpen
      onRequestClose={dismissDialog}
      contentLabel="Confirm your email"
      overlayClassName="email-verification__overlay"
      portalClassName={classNames(
        'email-verification__portal',
        'theme-' + theme
      )}
    >
      {requested ? displayEmailConfirm : displayEmailRequested}
    </Modal>
  );
};

export default EmailVerification;
