import * as types from "../actions/actionTypes";
import generateReducer from "./baseReducer";

export default function updatesReducer(state, action) {
  return generateReducer(state, action, {
    request: types.UPDATES_REQUEST,
    failure: types.UPDATES_FAILURE,
    getSuccess: types.GET_UPDATES_SUCCESS,
    addSuccess: types.ADD_UPDATE_SUCCESS,
    deleteSuccess: types.DELETE_UPDATE_SUCCESS
  });
}
