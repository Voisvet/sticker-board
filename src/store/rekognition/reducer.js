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
    case types.IMAGES_FETCHED:
      // TODO: Implement updating list of images when
      // will be implementing pagination
      return {
        ...state,
        list: action.list,
        fetchingInProgress: false
      };
    case types.IMAGES_FETCH_STARTED:
      return {
        ...state,
        fetchingInProgress: true
      };
    case types.IMAGES_FETCH_FAILED:
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

export function getListOfImages(state) {
  return state.rekognition.token;
}

export function getFetchingState(state) {
  return state.rekognition.fetchingInProgress;
}

export function getErrorMessage(state) {
  return state.rekognition.errorMessage;
}
