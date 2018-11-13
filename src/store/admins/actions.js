import * as api from '../../services/apiConnector';
import * as types from './actionTypes';
import * as userSelectors from '../user/reducer';
import * as errorsActions from '../errors/actions';

// Fetching list of administrators from server
// And adding it in our redux store
export function fetchListOfAdmins() {
  return async(dispatch, getState) => {
    // Notify that fetch started
    dispatch({
      type: types.ADMINS_FETCH_STARTED
    });

    const token = userSelectors.getUserToken(getState());
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
      dispatch(errorsActions.pushError(resp.error));
    }
  };
}

// Create new administrator and send request to server
// In case of success add admin to redux store
export function createNewAdmin(form_data) {
  return async(dispatch, getState) => {

    const token = userSelectors.getUserToken(getState());
    // Send request to server

    // Calculate access rights
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
      dispatch(errorsActions.pushError(resp.error));
    }
  };
}

// Send request to delete an administrator
// And delete it from redux store in case of success
export function deleteAdminWithId(id) {
  return async(dispatch, getState) => {

    const token = userSelectors.getUserToken(getState());
    // Send request to server

    const resp = await api.deleteAdmin(token, id);
    if (resp.status_code == 0) {
      // If all is alright, update admins lsit in store
      dispatch({
        type: types.ADMIN_DELETED,
        id
      });
    } else {
      // If something went wrong, update error message in store
      dispatch(errorsActions.pushError(resp.error));
    }
  };
}

// Save new information about concrete admin on the server
// And update it in redux store in case of success
export function editAdminWithId(id, form_data) {
  return async(dispatch, getState) => {

    const token = userSelectors.getUserToken(getState());
    // Send request to server

    // Calculate rights level if it is not superuser
    let access_rights = form_data.access_rights;
    if (access_rights !== -1) {
      access_rights = 0
      + (form_data.access_lvl_one ? 1 : 0)
      + (form_data.access_lvl_two ? 2 : 0)
      + (form_data.access_lvl_three ? 4 : 0);
    }

    // Create admin object
    const admin = {
      name: form_data.name,
      email: form_data.email,
      access_rights
    }

    // If password is updated, it also should be included
    if (form_data.password !== '') {
      admin.password = form_data.password;
    }

    const resp = await api.editAdmin(token, id, admin);
    if (resp.status_code == 0) {
      // If all is alright, update admins lsit in store

      dispatch({
        type: types.ADMIN_EDITED,
        admin,
        id
      });
    } else {
      // If something went wrong, update error message in store
      dispatch(errorsActions.pushError(resp.error));
    }
  };
}
