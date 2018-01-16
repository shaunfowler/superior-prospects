import generateReducer from "./baseReducer";
import { PROPERTY_ACTION_NAMES } from "../actions/propertiesActions";

export default function propertiesReducer(state, action) {
  return generateReducer(state, action, PROPERTY_ACTION_NAMES);
}
