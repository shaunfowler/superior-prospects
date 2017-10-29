import { combineReducers } from "redux";
import updates from "./updatesReducer";
import properties from "./propertiesReducer";

const rootReducer = combineReducers({ updates, properties });

export default rootReducer;
