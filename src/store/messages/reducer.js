import * as types from './actionTypes';

// --------------------------------------------------
//
//  Initial state of this part
//
// --------------------------------------------------

const initialState = {
  list: [],
  currentMessage: undefined,
  chats: undefined,
  fetchingInProgress: false,
  stickersList: []
};

// --------------------------------------------------
//
//  Reducer for this part
//
// --------------------------------------------------

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
        fetchingInProgress: false
      };
    case types.CHATS_LIST_FETCHED:
      return {
        ...state,
        chats: action.list
      };
    case types.MESSAGE_WITH_ID_FETCHED:
      return {
        ...state,
        currentMessage: action.message
      };
    case types.PAYLOAD_FETCHED:
      return {
        ...state,
        currentMessage: {
          ...state.currentMessage,
          payload: action.payload
        }
      };
    case types.MESSAGE_DELETED:
      return {
        ...state,
        list: state.list.filter(message => message.id != action.id)
      };
    case types.STICKERS_FETCHED:
      return {
        ...state,
        stickersList: action.list
      };
    case types.MESSAGE_CREATED:
      let list = state.list.slice();
      list.push(action.message);
      return {
        ...state,
        list
      };
    case types.STICKERS_FETCHED:
      return {
        ...state,
        stickersList: action.list
      };
    case types.STICKERS_FETCH_FAILED:
      return {
        ...state,
        errorMessage: action.errorMessage
      };
    case types.MESSAGE_CREATED:
      let list = state.list.slice();
      list.push(action.message);
      return {
        ...state,
        list
      };
    default:
      return state;
  }
}

// --------------------------------------------------
//
//  Selectors for this part
//
// --------------------------------------------------

export function getListOfMessages(state) {
  return state.messages.list;
}

export function getCurrentMessage(state) {
  return state.messages.currentMessage;
}

export function getFetchingState(state) {
  return state.messages.fetchingInProgress;
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

export function getListOfStickers(state) {
  return state.messages.stickersList;
}
