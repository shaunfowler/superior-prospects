import * as types from "../actions/actionTypes";
import generateReducer from "./baseReducer";

import { UPDATE_ACTION_NAMES } from "../actions/updatesActions";

export default function updatesReducer(state, action) {
  console.log(action);
  return generateReducer(state, action, {
    request: UPDATE_ACTION_NAMES.request,
    failure: UPDATE_ACTION_NAMES.failure,
    querySuccess: UPDATE_ACTION_NAMES.querySuccess,
    addSuccess: UPDATE_ACTION_NAMES.addSuccess,
    deleteSuccess: UPDATE_ACTION_NAMES.deleteSuccess
  });
}
