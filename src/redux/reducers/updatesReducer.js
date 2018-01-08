import * as types from "../actions/actionTypes";
import generateReducer from "./baseReducer";

import { UPDATE_ACTION_NAMES } from "../actions/updatesActions";

export default function updatesReducer(state, action) {
  return generateReducer(state, action, UPDATE_ACTION_NAMES);
}
