import { combineReducers } from 'redux';

import * as A from '../action-types';
import * as T from '../../types';

const emailVerificationRequested: A.Reducer<boolean | undefined> = (
  state = undefined,
  action
) => {
  switch (action.type) {
    case 'SET_EMAIL_VERIFY_REQUESTED':
      return action.requested;
    default:
      return state;
  }
};

const emailVerified: A.Reducer<boolean | undefined> = (
  state = undefined,
  action
) => {
  switch (action.type) {
    case 'SET_EMAIL_VERIFIED':
      return action.verified;
    default:
      return state;
  }
};

const sendEmailVerifyUrl: A.Reducer<string> = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEND_EMAIL_VERIFY_URL':
      return action.url;
    default:
      return state;
  }
};

export default combineReducers({
  emailVerificationRequested,
  emailVerified,
  sendEmailVerifyUrl,
});
