import Cookies from 'js-cookie';

import api from '../../services/apiConnector';

import * as types from './actionTypes';
import * as selectors from './reducer';

export function fetchTokenFromCookies() {
  return (dispatch, getState) => {
    let token = Cookies.get('user-token');
    if (typeof(token) == 'string') {
      dispatch({
        type: types.TOKEN_FETCHED,
        token
      });
    }
  };
}

export function fetchTokenFromServer(login, password) {
  return async(dispatch, getState) => {
    // Notify that fetch started
    dispatch({
      type: types.TOKEN_FETCH_STARTED
    });

    // Send request to a server
    const resp = await api.login(login, password);
    if (resp.status_code == 0) {
      // If all is alright, set cookies and update token in store
      Cookies.set('user-token', resp.token);
      dispatch({
        type: types.TOKEN_FETCHED,
        token: resp.token
      });
    } else {
      // If something went wrong, update error message in store
      dispatch({
        type: types.TOKEN_FETCH_FAILED,
        errorMessage: resp.error
      });
    }
  };
}
