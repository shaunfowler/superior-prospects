import * as types from "../actions/actionTypes";
import generateReducer from "./baseReducer";

export default function propertiesReducer(state, action) {
  return generateReducer(state, action, {
    getRequest: types.GET_PROPERTIES_REQUEST,
    addRequest: types.ADD_PROPERTY_REQUEST,
    deleteRequest: types.DELETE_PROPERTY_REQUEST,
    getFailure: types.GET_PROPERTIES_FAILURE,
    addFailure: types.ADD_PROPERTY_FAILURE,
    deleteFailure: types.DELETE_PROPERTY_FAILURE,
    getSuccess: types.GET_PROPERTIES_SUCCESS,
    addSuccess: types.ADD_PROPERTY_SUCCESS,
    deleteSuccess: types.DELETE_PROPERTY_SUCCESS
  });
}
