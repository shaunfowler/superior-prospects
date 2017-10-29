import { combineReducers } from "redux";
import updates from "./updatesReducer";
import properties from "./propertiesReducer";
import locations from "./locationsReducer";

const rootReducer = combineReducers({ updates, properties, locations });

export default rootReducer;
