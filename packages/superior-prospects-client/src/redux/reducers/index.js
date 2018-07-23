import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";
import updates from "./updatesReducer";
import properties from "./propertiesReducer";
import locations from "./locationsReducer";
import user from "./userReducer";

const rootReducer = combineReducers({
  updates,
  properties,
  locations,
  user,
  routing
});

export default rootReducer;
