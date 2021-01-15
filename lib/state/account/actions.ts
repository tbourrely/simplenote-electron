import type * as A from '../action-types';
import type * as T from '../../types';

export const setEmailVerificationRequested: A.ActionCreator<A.SetEmailVerificationRequested> = (
  requested: boolean
) => ({
  type: 'SET_EMAIL_VERIFICATION_REQUESTED',
  requested,
});

export const setEmailVerified: A.ActionCreator<A.SetEmailVerified> = (
  verified: boolean
) => ({
  type: 'SET_EMAIL_VERIFIED',
  verified,
});

export const setSendEmailVerifyURL: A.ActionCreator<A.SetEmailVerifyURL> = (
  url: string
) => ({
  type: 'SET_EMAIL_VERIFY_URL',
  url,
});
