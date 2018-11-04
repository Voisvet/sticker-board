import Cookies from 'js-cookie';

import api from '../../services/apiConnector';

import * as types from './actionTypes';
import * as selectors from './reducer';

export function fetchTokenFromCookies() {
  return (dispatch, getState) => {
    let token = Cookies.get('user-token');
    if (typeof(token) == 'string') {
      console.log('reached dispatching', getState());
      dispatch({
        type: types.TOKEN_FETCHED,
        token
      });
    }
  };
}

export function fetchTokenFromServer(login, password) {
  return async(dispatch, getState) => {
    const token = await api.login(login, password);
    // ToDo: Set cookie
    dispatch({
      type: types.TOKEN_FETCHED,
      token
    });
  };
}
