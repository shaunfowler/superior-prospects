import { USER_ACTION_NAMES } from "../actions/userActions";

const initialState = {
  loading: false,
  error: null,
  data: null,
  isAuthenticated: false
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_ACTION_NAMES.request:
      return Object.assign({}, state, {
        loading: true
      });

    case USER_ACTION_NAMES.getSuccess:
      const { data } = action;
      return Object.assign({}, state, {
        loading: false,
        data,
        isAuthenticated: true
      });

    case USER_ACTION_NAMES.failure:
      const { error } = action;
      return Object.assign({}, state, {
        loading: false,
        error
      });

    default:
      return state;
  }
}
