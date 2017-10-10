import * as types from "../actions/actionTypes";

export const initialState = {
  loading: false,
  error: null,
  list: []
};

export default function propertiesReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_PROPERTIES_REQUEST:
    case types.ADD_PROPERTY_REQUEST:
    case types.DELETE_PROPERTY_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });

    case types.GET_PROPERTIES_FAILURE:
    case types.ADD_PROPERTY_FAILURE:
    case types.DELETE_PROPERTY_FAILURE:
      const { error } = action;
      return Object.assign({}, state, {
        error,
        loading: false
      });

    case types.GET_PROPERTIES_SUCCESS:
      const { properties } = action;
      return Object.assign({}, state, {
        list: properties,
        loading: false
      });

    case types.DELETE_PROPERTY_SUCCESS:
      const { id } = action;
      return Object.assign({}, state, {
        list: [...state.list].filter(u => u._id !== id),
        loading: false,
        error: null
      });

    case types.ADD_PROPERTY_SUCCESS:
      const { property } = action;
      return Object.assign({}, state, {
        list: [...state.list, property],
        loading: false,
        error: null
      });

    default:
      return state;
  }
}
