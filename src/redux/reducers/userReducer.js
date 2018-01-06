import * as types from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  data: null,
  isAuthenticated: false
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_USER_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });

    case types.GET_USER_SUCCESS:
      const { data } = action;
      return Object.assign({}, state, {
        loading: false,
        data,
        isAuthenticated: true
      });

    case types.GET_USER_FAILURE:
      const { error } = action;
      return Object.assign({}, state, {
        loading: false,
        error
      });

    default:
      return state;
  }
}
