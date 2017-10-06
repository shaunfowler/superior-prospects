import * as types from "../actions/actionTypes";

export default function updatesReducer(state = [], action) {
  switch (action.type) {
    case types.GET_UPDATES_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case types.GET_UPDATES_SUCCESS:
      const { updates } = action;
      return Object.assign({}, state, {
        list: updates,
        loading: false
      });
    case types.GET_UPDATES_FAILURE:
      const { error } = action;
      return Object.assign({}, state, {
        error,
        loading: false
      });
    default:
      return state;
  }
}
