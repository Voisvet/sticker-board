import * as types from './actionTypes.js';

// Initialization of this part of store

const initialState = {
  token: undefined
};

// Reducer for this part of store

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.TOKEN_FETCHED:
      return {
        ...state,
        token: action.token,
        test: 'aaa'
      };
    default:
      return state;
  }
}

// Selectors for this part of store

export function getUserToken(state) {
  return state.user.token;
}
