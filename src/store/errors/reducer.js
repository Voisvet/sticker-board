import * as types from './actionTypes';

// --------------------------------------------------
//
// Initial state of this part
//
// --------------------------------------------------

const initialState = {
  errorQueue: []
};

// --------------------------------------------------
//
// Reducer for this part
//
// --------------------------------------------------

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.ERROR_PUSHED:
      const errorQueue = state.errorQueue.slice();
      errorQueue.push(action.errorMessage);
      return {
        ...state,
        errorQueue
      };
    case types.ERROR_POPPED:
      return {
        ...state,
        errorQueue: state.errorQueue.slice(1)
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

export function hasErrors(state) {
  return state.errors.errorQueue.length > 0;
}

export function getFirstError(state) {
  return state.errors.errorQueue[0];
}
