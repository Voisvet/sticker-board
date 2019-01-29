import * as types from './actionTypes';

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

export interface State {
  token?: string;
  errorMessage?: string;
  fetchingInProgress: boolean;
}

interface Action {
  type: string;
  token?: string;
  errorMessage?: string;
}

// --------------------------------------------------
//
//  Reducer for this part
//
// --------------------------------------------------

export default function reduce(state: State = initialState, action: Action): State {
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

export function getUserToken(state: {user: State}): string {
  return state.user.token;
}

export function getFetchingState(state: {user: State}): boolean {
  return state.user.fetchingInProgress;
}

export function getErrorMessage(state: {user: State}): string {
  return state.user.errorMessage;
}
