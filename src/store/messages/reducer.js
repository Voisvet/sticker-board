import * as types from './actionTypes';

// Initialization of this part of store

const initialState = {
  list: [],
  currentMessage: undefined,
  chats: undefined,
  errorMessage: undefined,
  fetchingInProgress: false
};

// Reducer for this part of store

export default function reduce(state = initialState, action = {}) {
  //console.log("Dispatch", action.type);
  switch (action.type) {
    case types.MESSAGES_FETCHED:
      // TODO: Implement updating list of messages when
      // will be implementing pagination
      return {
        ...state,
        list: action.list,
        fetchingInProgress: false
      };
    case types.MESSAGES_FETCH_STARTED:
      return {
        ...state,
        fetchingInProgress: true
      };
    case types.MESSAGES_FETCH_FAILED:
      return {
        ...state,
        fetchingInProgress: false,
        errorMessage: action.errorMessage
      };
    case types.CHATS_LIST_FETCHED:
      return {
        ...state,
        chats: action.list
      };
    case types.CHATS_LIST_FETCH_FAILED:
      return {
        ...state,
        errorMessage: action.errorMessage
      };
    case types.MESSAGE_WITH_ID_FETCHED:
      return {
        ...state,
        currentMessage: action.message
      };
    case types.MESSAGE_WITH_ID_FETCH_FAILED:
      return {
        ...state,
        errorMessage: action.errorMessage
      };
    case types.PAYLOAD_FETCHED:
      return {
        ...state,
        currentMessage: {
          ...state.currentMessage,
          payload: action.payload
        }
      };
    case types.PAYLOAD_FETCH_FAILED:
      return {
        ...state,
        errorMessage: action.errorMessage
      };
    case types.MESSAGE_DELETED:
      return {
        ...state,
        list: state.list.filter(message => message.id != action.id)
      };
    case types.MESSAGE_DELETION_FAILED:
      return {
        ...state,
        errorMessage: action.errorMessage
      };
    default:
      return state;
  }
}

// Selectors for this part of store

export function getListOfMessages(state) {
  return state.messages.list;
}

export function getCurrentMessage(state) {
  return state.messages.currentMessage;
}

export function getFetchingState(state) {
  return state.messages.fetchingInProgress;
}

export function getErrorMessage(state) {
  return state.messages.errorMessage;
}

export function getListOfChats(state) {
  return state.messages.chats;
}

export function getChatIdToNameMapping(state) {
  const chats = state.messages.chats;
  let chatsMapping = undefined;
  if (chats) {
    chatsMapping = {};
    for (let i = 0; i < chats.length; i++) {
      chatsMapping[chats[i].id] = chats[i].name;
    }
  }
  return chatsMapping;
}
