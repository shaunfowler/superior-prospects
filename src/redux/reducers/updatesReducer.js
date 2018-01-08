import * as types from "../actions/actionTypes";
import generateReducer from "./baseReducer";

import { UPDATE_ACTION_NAMES } from "../actions/updatesActions";

export default function updatesReducer(state, action) {
  console.log(action);
  return generateReducer(state, action, {
    request: types.UPDATES_REQUEST,
    failure: types.UPDATES_FAILURE,
    getSuccess: UPDATE_ACTION_NAMES.querySuccess,
    addSuccess: types.ADD_UPDATE_SUCCESS,
    deleteSuccess: types.DELETE_UPDATE_SUCCESS
  });
}
