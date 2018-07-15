import axios from "axios";
import { asyncActionNames, buildAsyncActions } from "./actionUtils";

export const LOCATION_ACTION_NAMES = asyncActionNames("LOCATION");
export const LOCATION_ACTIONS = buildAsyncActions(LOCATION_ACTION_NAMES);

export const queryLocations = () => {
  return dispatch => {
    dispatch(LOCATION_ACTIONS.request());
    return axios
      .get("/api/locations")
      .then(response => {
        dispatch(LOCATION_ACTIONS.querySuccess(response.data));
      })
      .catch(response => {
        dispatch(LOCATION_ACTIONS.failure(response));
      });
  };
};

export const updateLocation = ({ _id, name, description }) => {
  return dispatch => {
    dispatch(LOCATION_ACTIONS.request());
    return axios
      .put(`/api/locations/${_id}`, { name, body: description })
      .then(response => {
        dispatch(LOCATION_ACTIONS.editSuccess(response.data));
      })
      .catch(response => {
        dispatch(LOCATION_ACTIONS.failure(response));
      });
  };
};

export const createLocation = ({ name, description }) => {
  return dispatch => {
    dispatch(LOCATION_ACTIONS.request());
    return axios
      .post("/api/locations", { name, body: description })
      .then(response => {
        dispatch(LOCATION_ACTIONS.createSuccess(response.data));
      })
      .catch(response => {
        dispatch(LOCATION_ACTIONS.failure(response));
      });
  };
};
