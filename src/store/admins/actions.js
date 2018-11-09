import * as api from '../../services/apiConnector';

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

export function createNewAdmin(form_data) {
  return async(dispatch, getState) => {

    const token = getState().user.token;
    // Send request to server

    let access_rights = 0
            + (form_data.access_lvl_one ? 1 : 0)
            + (form_data.access_lvl_two ? 2 : 0)
            + (form_data.access_lvl_three ? 4 : 0);

    const admin = {
      name: form_data.name,
      email: form_data.email,
      password: form_data.password,
      access_rights
    }

    const resp = await api.createAdmin(token, admin);
    if (resp.status_code == 0) {
      // If all is alright, update admins lsit in store
      admin.id = resp.id;

      dispatch({
        type: types.ADMIN_CREATED,
        admin: admin
      });
    } else {
      // If something went wrong, update error message in store
      dispatch({
        type: types.ADMIN_CREATION_FAILED,
        errorMessage: resp.error
      });
    }
  };
}
