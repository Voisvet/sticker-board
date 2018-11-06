import api from '../../services/apiConnector';

import * as types from './actionTypes';

export function fetchListOfAdmins() {
  return async(dispatch, getState) => {
    // Notify that fetch started
    dispatch({
      type: types.ADMINS_FETCH_STARTED
    });

    const token = getState().user.token;
    // Send request to server
    const resp = await api.getListOfAdmins(token);
    if (resp.status_code == 0) {
      // If all is alright, update admins lsit in store
      dispatch({
        type: types.ADMINS_FETCHED,
        list: resp.list
      });
    } else {
      // If something went wrong, update error message in store
      dispatch({
        type: types.ADMINS_FETCH_FAILED,
        errorMessage: resp.error
      });
    }
  };
}
