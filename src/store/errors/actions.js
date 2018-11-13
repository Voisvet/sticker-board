import * as types from './actionTypes';

// Add new error to error queue
export function pushError(errorMessage) {
  return {
    type: types.ERROR_PUSHED,
    errorMessage
  };
}

export function deleteFirstError() {
  return {
    type: types.ERROR_POPPED
  };
}
