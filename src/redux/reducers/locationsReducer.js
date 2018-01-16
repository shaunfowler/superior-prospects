import * as types from "../actions/actionTypes";
import generateReducer from "./baseReducer";

export default function locationsReducer(state, action) {
  return generateReducer(state, action, {
    request: types.LOCATIONS_REQUEST,
    failure: types.LOCATIONS_FAILURE,
    querySuccess: types.GET_LOCATIONS_SUCCESS,
    addSuccess: types.ADD_LOCATION_SUCCESS,
    deleteSuccess: types.DELETE_LOCATION_SUCCESS
  });
}
