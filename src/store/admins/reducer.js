import * as types from './actionTypes';

// Initialization of this part of store

const initialState = {
  list: [],
  errorMessage: undefined,
  fetchingInProgress: false
};

// Reducer for this part of store

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.ADMINS_FETCHED:
      // TODO: Implement updating list of admins when
      // will be implementing pagination
      return {
        ...state,
        list: action.list,
        fetchingInProgress: false
      };
    case types.ADMINS_FETCH_STARTED:
      return {
        ...state,
        fetchingInProgress: true
      };
    case types.ADMINS_FETCH_FAILED:
      return {
        ...state,
        fetchingInProgress: false,
        errorMessage: action.errorMessage
      };
    case types.ADMIN_CREATED:
      let list = state.list.slice();
      list.push(action.admin);
      return {
        ...state,
        list
      };
    case types.ADMIN_CREATION_FAILED:
      return {
        ...state,
        errorMessage: action.errorMessage
      };
    case types.ADMIN_DELETED:
      return {
        ...state,
        list: state.list.filter(admin => admin.id != action.id)
      };
    case types.ADMIN_DELETION_FAILED:
      return {
        ...state,
        errorMessage: action.errorMessage
      };
    case types.ADMIN_EDITED:
      const editedAdmin = state.list.findIndex(admin => admin.id === action.id);
      const newList = state.list.slice();
      newList[editedAdmin] = { ...action.admin, id: action.id };
      return {
        ...state,
        list: newList
      };
    case types.ADMIN_EDITING_FAILED:
      return {
        ...state,
        errorMessage: action.errorMessage
      };
    default:
      return state;
  }
}

// Selectors for this part of store

export function getListOfAdmins(state) {
  return state.admins.list;
}

export function getFetchingState(state) {
  return state.admins.fetchingInProgress;
}

export function getErrorMessage(state) {
  return state.admins.errorMessage;
}
