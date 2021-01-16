import { combineReducers } from 'redux';

import * as A from '../action-types';

const emailVerificationRequested: A.Reducer<boolean | null> = (
  state = null,
  action
) => {
  switch (action.type) {
    case 'SET_EMAIL_VERIFICATION_REQUESTED':
      return action.requested;
    default:
      return state;
  }
};

const emailVerified: A.Reducer<boolean | null> = (state = null, action) => {
  switch (action.type) {
    case 'SET_EMAIL_VERIFIED':
      return action.verified;
    default:
      return state;
  }
};

export default combineReducers({
  emailVerificationRequested,
  emailVerified,
});
