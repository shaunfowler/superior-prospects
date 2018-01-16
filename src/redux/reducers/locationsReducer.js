import generateReducer from "./baseReducer";
import { LOCATION_ACTION_NAMES } from "../actions/locationsActions";

export default function locationsReducer(state, action) {
  return generateReducer(state, action, LOCATION_ACTION_NAMES);
}
