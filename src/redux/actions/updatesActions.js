import * as model from "../models/updates";
import {
  UPDATES_REQUEST,
  UPDATES_FAILURE,
  GET_UPDATES_SUCCESS,
  DELETE_UPDATE_SUCCESS,
  ADD_UPDATE_SUCCESS
} from "./actionTypes";

function createUpdatesRequest() {
  return { type: UPDATES_REQUEST };
}

function createUpdatesFailure(error) {
  return { type: UPDATES_FAILURE, error };
}

// GET

function createGetUpdatesSuccess(entities) {
  return { type: GET_UPDATES_SUCCESS, entities };
}

// DELETE

function createDeleteUpdateSuccess(id) {
  return { type: DELETE_UPDATE_SUCCESS, id };
}

// ADD

function createAddUpdateSuccess(entity) {
  return { type: ADD_UPDATE_SUCCESS, entity };
}

export function getUpdates() {
  return dispatch => {
    dispatch(createUpdatesRequest());
    return model
      .getUpdates()
      .then(response => {
        dispatch(createGetUpdatesSuccess(response.data));
      })
      .catch(response => {
        dispatch(createUpdatesFailure(response));
      });
  };
}

export function addUpdate(update) {
  return dispatch => {
    dispatch(createUpdatesRequest());
    return model
      .addUpdate(update)
      .then(response => {
        dispatch(createAddUpdateSuccess(response.data));
      })
      .catch(response => {
        dispatch(createUpdatesFailure(response));
      });
  };
}

export function deleteUpdate(id) {
  return dispatch => {
    dispatch(createUpdatesRequest());
    return model
      .deleteUpdate(id)
      .then(() => {
        dispatch(createDeleteUpdateSuccess(id));
      })
      .catch(response => {
        dispatch(createUpdatesFailure(response));
      });
  };
}
