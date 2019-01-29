import * as Cookies from 'js-cookie';

import * as api from '../../services/apiConnector';
import * as types from './actionTypes';

import * as errorsActions from '../errors/actions';

// Look up for token in cookies
// and save it in redux store
export function fetchTokenFromCookies(): Function {
  return (dispatch: Function, getState: Function) => {
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
export function fetchTokenFromServer(login: string, password: string): Function {
  return async(dispatch: Function, getState: Function) => {
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
      dispatch(errorsActions.pushError(resp.error));
    }
  };
}

// Delete token from cookies and store
export function invalidateToken(): Function {
  return async(dispatch: Function, getState: Function) => {
    // Just delete token because it is JWT
    // and it does not require to notify server
    Cookies.remove('user-token');
    dispatch({
      type: types.TOKEN_INVALIDATED
    });
  };
}

export function showErrorMessage(error: string): Function {
  return (dispatch: Function, getState: Function) => {
    dispatch({
      type: types.LOGIN_FORM_INPUT_INVALID,
      errorMessage: error
    });
  };
}
