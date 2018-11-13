import * as types from './actionTypes';

// --------------------------------------------------
//
//  Initial state of this part
//
// --------------------------------------------------

const initialState = {
  list: [],
  fetchingInProgress: false
};

// --------------------------------------------------
//
//  Reducer for this part
//
// --------------------------------------------------

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
        fetchingInProgress: false
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

export function getListOfImages(state) {
  return state.rekognition.list;
}

export function getFetchingState(state) {
  return state.rekognition.fetchingInProgress;
}
