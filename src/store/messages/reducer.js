import * as types from './actionTypes';

// Initialization of this part of store

const initialState = {
  list: [],
  errorMessage: undefined,
  fetchingInProgress: false
};

// Reducer for this part of store

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.MESSAGES_FETCHED:
      // TODO: Implement updating list of messages when
      // will be implementing pagination
      return {
        ...state,
        list: action.list,
        fetchingInProgress: false
      };
    case types.MESSAGES_FETCH_STARTED:
      return {
        ...state,
        fetchingInProgress: true
      };
    case types.MESSAGES_FETCH_FAILED:
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

export function getListOfMessages(state) {
  return state.messages.list;
}

export function getFetchingState(state) {
  return state.messages.fetchingInProgress;
}

export function getErrorMessage(state) {
  return state.messages.errorMessage;
}
