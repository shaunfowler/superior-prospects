import * as model from "../models/updates";
import {
  GET_UPDATES_REQUEST,
  GET_UPDATES_SUCCESS,
  GET_UPDATES_FAILURE
} from "./actionTypes";

function createGetUpdatesRequest() {
  return { type: GET_UPDATES_REQUEST };
}

function createGetUpdatesSuccess(updates) {
  return { type: GET_UPDATES_SUCCESS, updates };
}

function createGetUpdatesFailure(error) {
  return { type: GET_UPDATES_FAILURE, error };
}

export function getUpdates() {
  return dispatch => {
    dispatch(createGetUpdatesRequest());
    return model
      .getAll()
      .then(response => {
        dispatch(createGetUpdatesSuccess(response.data));
      })
      .catch(response => {
        dispatch(createGetUpdatesFailure(response));
      });
  };
}
