import * as api from '../../services/apiConnector';

import * as types from './actionTypes';

import * as userSelectors from '../user/reducer';

export function fetchListOfMessages() {
  return async(dispatch, getState) => {
    // Notify that fetch started
    dispatch({
      type: types.MESSAGES_FETCH_STARTED
    });

    const token = userSelectors.getUserToken(getState());
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

export function fetchListOfChats() {
  return async(dispatch, getState) => {
    const token = userSelectors.getUserToken(getState());
    // Send request to server
    const resp = await api.getListOfChats(token);
    if (resp.status_code == 0) {
      // If all is alright, update chats in store
      dispatch({
        type: types.CHATS_LIST_FETCHED,
        list: resp.list
      });
    } else {
      // If something went wrong, update error message in store
      dispatch({
        type: types.CHATS_LIST_FETCH_FAILED,
        errorMessage: resp.error
      });
    }
  };
}

export function fetchMessageWithId(id) {
  return async(dispatch, getState) => {
    const token = userSelectors.getUserToken(getState());
    // Send request to server
    const resp = await api.getMessageInfo(token, id);
    if (resp.status_code == 0) {
      // If all is alright, update chats in store
      dispatch({
        type: types.MESSAGE_WITH_ID_FETCHED,
        message: {
          ...resp.message,
          id
        }
      });
    } else {
      // If something went wrong, update error message in store
      dispatch({
        type: types.MESSAGE_WITH_ID_FETCH_FAILED,
        errorMessage: resp.error
      });
    }
  };
}
