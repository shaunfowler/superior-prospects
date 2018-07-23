import axios from "axios";
import { asyncActionNames, buildAsyncActions } from "./actionUtils";

export const UPDATE_ACTION_NAMES = asyncActionNames("UPDATES");
export const UPDATE_ACTIONS = buildAsyncActions(UPDATE_ACTION_NAMES);

export function queryUpdates() {
  return dispatch => {
    dispatch(UPDATE_ACTIONS.request());
    return axios
      .get("/api/updates")
      .then(response => {
        dispatch(UPDATE_ACTIONS.querySuccess(response.data));
      })
      .catch(response => {
        dispatch(UPDATE_ACTIONS.failure(response));
      });
  };
}

export function createUpdate(update) {
  return dispatch => {
    dispatch(UPDATE_ACTIONS.request());
    return axios
      .post("/api/updates", update)
      .then(response => {
        dispatch(UPDATE_ACTIONS.createSuccess(response.data));
      })
      .catch(response => {
        dispatch(UPDATE_ACTIONS.failure(response));
      });
  };
}

export function deleteUpdate(id) {
  return dispatch => {
    dispatch(UPDATE_ACTIONS.request());
    return axios
      .delete(`/api/updates/${id}`)
      .then(() => {
        dispatch(UPDATE_ACTIONS.deleteSuccess(id));
      })
      .catch(response => {
        dispatch(UPDATE_ACTIONS.failure(response));
      });
  };
}
