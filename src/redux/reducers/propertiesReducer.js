import * as types from "../actions/actionTypes";
import generateReducer from "./baseReducer";

export default function propertiesReducer(state, action) {
  return generateReducer(state, action, {
    request: types.PROPERTIES_REQUEST,
    failure: types.PROPERTIES_FAILURE,
    getSuccess: types.GET_PROPERTIES_SUCCESS,
    addSuccess: types.ADD_PROPERTY_SUCCESS,
    deleteSuccess: types.DELETE_PROPERTY_SUCCESS
  });
}
