import * as types from "../actions/actionTypes";
import generateReducer from "./baseReducer";

export default function locationsReducer(state, action) {
  return generateReducer(state, action, {
    getRequest: types.GET_LOCATIONS_REQUEST,
    addRequest: types.ADD_LOCATION_REQUEST,
    deleteRequest: types.DELETE_LOCATION_REQUEST,
    getFailure: types.GET_LOCATIONS_FAILURE,
    addFailure: types.ADD_LOCATION_FAILURE,
    deleteFailure: types.DELETE_LOCATION_FAILURE,
    getSuccess: types.GET_LOCATIONS_SUCCESS,
    addSuccess: types.ADD_LOCATION_SUCCESS,
    deleteSuccess: types.DELETE_LOCATION_SUCCESS
  });
}
