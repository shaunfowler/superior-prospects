import { combineReducers } from "redux";
import updates from "./updatesReducer";
import properties from "./propertiesReducer";
import locations from "./locationsReducer";
import user from "./userReducer";

const rootReducer = combineReducers({ updates, properties, locations, user });

export default rootReducer;
