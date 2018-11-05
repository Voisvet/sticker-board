import api from '../../services/apiConnector';

import * as types from './actionTypes';
import * as selectors from './reducer';

export function fetchListOfImages() {
  return async(dispatch, getState) => {
    // Notify that fetch started
    dispatch({
      type: types.IMAGES_FETCH_STARTED
    });

    const token = getState().user.token;
    // Send request to server
    const resp = await api.getListOfImages(token);
    if (resp.status_code == 0) {
      // If all is alright, update images list in store
      dispatch({
        type: types.IMAGES_FETCHED,
        list: resp.list
      });
    } else {
      // If something went wrong, update error message in store
      dispatch({
        type: types.IMAGES_FETCH_FAILED,
        errorMessage: resp.error
      });
    }
  };
}
