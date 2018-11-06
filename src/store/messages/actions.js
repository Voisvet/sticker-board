import api from '../../services/apiConnector';

import * as types from './actionTypes';

export function fetchListOfMessages() {
  return async(dispatch, getState) => {
    // Notify that fetch started
    dispatch({
      type: types.MESSAGES_FETCH_STARTED
    });

    const token = getState().user.token;
    // Send request to server
    const resp = await api.getListOfMessages(token);
    if (resp.status_code == 0) {
      // If all is alright, update messages in store
      dispatch({
        type: types.MESSAGES_FETCHED,
        list: resp.list
      });
    } else {
      // If something went wrong, update message in store
      dispatch({
        type: types.MESSAGES_FETCH_FAILED,
        errorMessage: resp.error
      });
    }
  };
}
