import * as types from "../actions/actionTypes";

export const initialState = {
  loading: false,
  error: null,
  list: []
};

export default function updatesReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_UPDATES_REQUEST:
    case types.ADD_UPDATE_REQUEST:
    case types.DELETE_UPDATE_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });

    case types.GET_UPDATES_FAILURE:
    case types.ADD_UPDATE_FAILURE:
    case types.DELETE_UPDATE_FAILURE:
      const { error } = action;
      return Object.assign({}, state, {
        error,
        loading: false
      });

    case types.GET_UPDATES_SUCCESS:
      const { updates } = action;
      return Object.assign({}, state, {
        list: updates,
        loading: false
      });

    case types.DELETE_UPDATE_SUCCESS:
      const { id } = action;
      return Object.assign({}, state, {
        list: [...state.list].filter(u => u.id !== id),
        loading: false,
        error: null
      });

    case types.ADD_UPDATE_SUCCESS:
      const { update } = action;
      return Object.assign({}, state, {
        list: [...state.list, update],
        loading: false,
        error: null
      });

    default:
      return state;
  }
}
