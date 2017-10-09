import * as model from "../models/updates";
import {
  GET_UPDATES_REQUEST,
  GET_UPDATES_SUCCESS,
  GET_UPDATES_FAILURE,
  DELETE_UPDATE_REQUEST,
  DELETE_UPDATE_SUCCESS,
  DELETE_UPDATE_FAILURE,
  ADD_UPDATE_REQUEST,
  ADD_UPDATE_SUCCESS,
  ADD_UPDATE_FAILURE
} from "./actionTypes";

// GET

function createGetUpdatesRequest() {
  return { type: GET_UPDATES_REQUEST };
}

function createGetUpdatesSuccess(updates) {
  return { type: GET_UPDATES_SUCCESS, updates };
}

function createGetUpdatesFailure(error) {
  return { type: GET_UPDATES_FAILURE, error };
}

// DELETE

function createDeleteUpdateRequest(id) {
  return { type: DELETE_UPDATE_REQUEST, id };
}

function createDeleteUpdateSuccess(id) {
  return { type: DELETE_UPDATE_SUCCESS, id };
}

function createDeleteUpdateFailure(error) {
  return { type: DELETE_UPDATE_FAILURE, error };
}

// ADD

function createAddUpdateRequest(update) {
  return { type: ADD_UPDATE_REQUEST, update };
}

function createAddUpdateSuccess(update) {
  return { type: ADD_UPDATE_SUCCESS, update };
}

function createAddUpdateFailure(error) {
  return { type: ADD_UPDATE_FAILURE, error };
}

export function getUpdates() {
  return dispatch => {
    dispatch(createGetUpdatesRequest());
    return model
      .getUpdates()
      .then(response => {
        dispatch(createGetUpdatesSuccess(response.data));
      })
      .catch(response => {
        dispatch(createGetUpdatesFailure(response));
      });
  };
}

export function addUpdate(update) {
  return dispatch => {
    dispatch(createAddUpdateRequest());
    return model
      .addUpdate(update)
      .then(response => {
        dispatch(createAddUpdateSuccess(response.data));
      })
      .catch(response => {
        dispatch(createAddUpdateFailure(response));
      });
  };
}

export function deleteUpdate(id) {
  return dispatch => {
    dispatch(createDeleteUpdateRequest());
    return model
      .deleteUpdate(id)
      .then(() => {
        dispatch(createDeleteUpdateSuccess(id));
      })
      .catch(response => {
        dispatch(createDeleteUpdateFailure(response));
      });
  };
}
