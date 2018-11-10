import Cookies from 'js-cookie';

import * as api from '../../services/apiConnector';
import * as types from './actionTypes';

// Look up for token in cookies
// and save it in redux store
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

// Request new token from server
// and save it in redux store
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

// Delete token from cookies and store
export function invalidateToken() {
  return async(dispatch, getState) => {
    // Just delete token because it is JWT
    // and it does not require to notify server
    Cookies.remove('user-token');
    dispatch({
      type: types.TOKEN_INVALIDATED
    });
  };
}

export function showErrorMessage(error) {
  return (dispatch, getState) => {
    dispatch({
      type: types.LOGIN_FORM_INPUT_INVALID,
      errorMessage: error
    });
  };
}
