import generateReducer from "./baseReducer";
import { PROPERTY_ACTION_NAMES } from "../actions/propertiesActions";
import { MEDIA_ACTION_NAMES } from "../actions/mediaActions";

export default function propertiesReducer(state, action) {
  let newState = generateReducer(state, action, PROPERTY_ACTION_NAMES);

  switch (action.type) {
    case MEDIA_ACTION_NAMES.createSuccess:
      if (action.entity.propertyRefId === state.selected._id) {
        newState = { ...state, selected: { ...state.selected } };
        newState.selected.media = [...newState.selected.media].concat({
          ...action.entity
        });
      }
      return newState;
    case MEDIA_ACTION_NAMES.deleteSuccess:
      newState = { ...state, selected: { ...state.selected } };
      console.log(action);
      newState.selected.media = [...newState.selected.media].filter(
        m => m._id !== action.id
      );
      return newState;
    default:
      return newState;
  }
}
