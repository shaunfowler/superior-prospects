import * as types from "../actions/actionTypes";
import generateReducer from "./baseReducer";

export default function updatesReducer(state, action) {
  return generateReducer(state, action, {
    getRequest: types.GET_UPDATES_REQUEST,
    addRequest: types.ADD_UPDATE_REQUEST,
    deleteRequest: types.DELETE_UPDATE_REQUEST,
    getFailure: types.GET_UPDATES_FAILURE,
    addFailure: types.ADD_UPDATE_FAILURE,
    deleteFailure: types.DELETE_UPDATE_FAILURE,
    getSuccess: types.GET_UPDATES_SUCCESS,
    addSuccess: types.ADD_UPDATE_SUCCESS,
    deleteSuccess: types.DELETE_UPDATE_SUCCESS
  });
}
