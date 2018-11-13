import * as api from '../../services/apiConnector';
import * as types from './actionTypes';
import * as userSelectors from '../user/reducer';

import * as errorsActions from '../errors/actions';

// Fetch list of messages from server
// And save it to redux store
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
        type: types.MESSAGES_FETCH_FAILED
      });
      dispatch(errorsActions.pushError(resp.error));
    }
  };
}

// Fetch list of chats with their ids
// And save it to redux store
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
      dispatch(errorsActions.pushError(resp.error));
    }
  };
}

// Fetch detailed information about concrete message
// And save it to redux store
export function fetchMessageWithId(id) {
  return async(dispatch, getState) => {
    const token = userSelectors.getUserToken(getState());
    // Send request to server
    const resp = await api.getMessageInfo(token, id);
    if (resp.status_code == 0) {
      // If all is alright, update current message in store
      dispatch({
        type: types.MESSAGE_WITH_ID_FETCHED,
        message: {
          ...resp.message,
          id
        }
      });
    } else {
      // If something went wrong, update error message in store
      dispatch(errorsActions.pushError(resp.error));
    }
  };
}

// Fetch payload of the message
// And save it to store
export function fetchPayloadWithId(id) {
  return async(dispatch, getState) => {
    const token = userSelectors.getUserToken(getState());
    // Send request to server
    const resp = await api.getMessagePayload(token, id);
    if (resp.status_code == 0) {
      // If all is alright, update current payload in message in store
      dispatch({
        type: types.PAYLOAD_FETCHED,
        payload: resp.payload
      });
    } else {
      // If something went wrong, update error message in store
      dispatch(errorsActions.pushError(resp.error));
    }
  };
}

// Delete message with given id
// And update information in store
export function deleteMessageWithId(id) {
  return async(dispatch, getState) => {
    const token = userSelectors.getUserToken(getState());
    // Send request to server
    const resp = await api.deleteMessage(token, id);
    if (resp.status_code == 0) {
      // If all is alright, update current list with messages in store
      dispatch({
        type: types.MESSAGE_DELETED,
        id: id
      });
    } else {
      // If something went wrong, update error message in store
      dispatch(errorsActions.pushError(resp.error));
    }
  };
}

// Fetch stickers list from server
// And put it in the store
export function fetchStickers() {
  return async(dispatch, getState) => {
    const token = userSelectors.getUserToken(getState());
    // Send request to the server
    const resp = await api.getListOfRecentlyUsedStickers(token);
    if (resp.status_code == 0) {
      dispatch({
        type: types.STICKERS_FETCHED,
        list: resp.list
      });
    } else {
      dispatch(errorsActions.pushError(resp.error));
    }
  };
}

// Create new message on the server
// And update store
export function createMessage(message) {
  return async(dispatch, getState) => {
    const token = userSelectors.getUserToken(getState());
    // Send request to the server
    const resp_message = await api.createMessage(
      token,
      message.type,
      message.date,
      message.periods,
      message.chats
    );

    if (resp_message.status_code == 0) {
      const resp_payload = await api.updatePayload(
        token,
        resp_message.id,
        message.payload_type,
        message.payload,
        message.file_name
      );

      if (resp_payload.status_code == 0) {
        dispatch({
          type: types.MESSAGE_CREATED,
          message: {
            ...message,
            id: resp_message.id,
            closest_date: resp_message.closest_date
          }
        });
      } else {
        dispatch(errorsActions.pushError(resp_payload.error));
      }
    } else {
      dispatch(errorsActions.pushError(resp_message.error));
    }
  };
}

// Fetch stickers list from server
// And put it in the store
export function fetchStickers() {
  return async(dispatch, getState) => {
    const token = userSelectors.getUserToken(getState());
    // Send request to the server
    const resp = await api.getListOfRecentlyUsedStickers(token);
    if (resp.status_code == 0) {
      dispatch({
        type: types.STICKERS_FETCHED,
        list: resp.list
      });
    } else {
      dispatch({
        type: types.STICKERS_FETCH_FAILED,
        errorMessage: resp.error
      });
    }
  };
}

// Create new message on the server
// And update store
export function createMessage(message) {
  return async(dispatch, getState) => {
    const token = userSelectors.getUserToken(getState());
    // Send request to the server
    const resp_message = await api.createMessage(
      token,
      message.type,
      message.date,
      message.periods,
      message.chats
    );

    if (resp_message.status_code == 0) {
      const resp_payload = await api.updatePayload(
        token,
        resp_message.id,
        message.payload_type,
        message.payload,
        message.file_name
      );
      
      if (resp_payload.status_code == 0) {
        dispatch({
          type: types.MESSAGE_CREATED,
          message: {
            ...message,
            id: resp_message.id,
            closest_date: resp_message.closest_date
          }
        });
      } else {
        console.log(resp_payload.error);
        dispatch({
          type: types.STICKERS_FETCH_FAILED,
          errorMessage: resp_payload.error
        });
      }
    } else {
      console.log(resp_message.error);
      dispatch({
        type: types.STICKERS_FETCH_FAILED,
        errorMessage: resp_message.error
      });
    }
  };
}
