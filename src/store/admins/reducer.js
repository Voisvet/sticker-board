import * as types from './actionTypes';

// Initialization of this part of store

const initialState = {
  list: undefined,
  errorMessage: undefined,
  fetchingInProgress: false
};

// Reducer for this part of store

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.ADMINS_FETCHED:
      // TODO: Implement updating list of admins when
      // will be implementing pagination
      return {
        ...state,
        list: action.list,
        fetchingInProgress: false
      };
    case types.ADMINS_FETCH_STARTED:
      return {
        ...state,
        fetchingInProgress: true
      };
    case types.ADMINS_FETCH_FAILED:
      return {
        ...state,
        fetchingInProgress: false,
        errorMessage: action.errorMessage
      };
    default:
      return state;
  }
}

// Selectors for this part of store

export function getListOfAdmins(state) {
  return state.admins.token;
}

export function getFetchingState(state) {
  return state.admins.fetchingInProgress;
}

export function getErrorMessage(state) {
  return state.admins.errorMessage;
}
