import * as model from "../models/updates";
import {
  GET_UPDATES_REQUEST,
  GET_UPDATES_SUCCESS,
  GET_UPDATES_FAILURE,
  DELETE_UPDATE_SUCCESS
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

function createDeleteUpdateSuccess(id) {
  return { type: DELETE_UPDATE_SUCCESS, id };
}

export function deleteUpdate(id) {
  return dispatch => {
    return model.deleteUpdate(id).then(() => {
      dispatch(createDeleteUpdateSuccess(id));
    });
  };
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
