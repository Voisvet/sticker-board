import * as types from './actionTypes.js';

// --------------------------------------------------
//
//  Initial state of this part
//
// --------------------------------------------------

const initialState = {
  token: undefined,
  errorMessage: undefined,
  fetchingInProgress: false
};

// --------------------------------------------------
//
//  Reducer for this part
//
// --------------------------------------------------

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.TOKEN_FETCHED:
      return {
        ...state,
        token: action.token,
        fetchingInProgress: false
      };
    case types.TOKEN_FETCH_STARTED:
      return {
        ...state,
        fetchingInProgress: true
      };
    case types.TOKEN_FETCH_FAILED:
      return {
        ...state,
        fetchingInProgress: false,
        errorMessage: action.errorMessage
      };
    case types.TOKEN_INVALIDATED:
      return {
        ...state,
        token: undefined
      };
    case types.LOGIN_FORM_INPUT_INVALID:
      return {
        ...state,
        errorMessage: action.errorMessage
      };
    default:
      return state;
  }
}

// --------------------------------------------------
//
//  Selectors for this part
//
// --------------------------------------------------

export function getUserToken(state) {
  return state.user.token;
}

export function getFetchingState(state) {
  return state.user.fetchingInProgress;
}

export function getErrorMessage(state) {
  return state.user.errorMessage;
}
