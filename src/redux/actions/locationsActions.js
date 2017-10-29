import * as model from "../models/locations";
import {
  GET_LOCATIONS_REQUEST,
  GET_LOCATIONS_SUCCESS,
  GET_LOCATIONS_FAILURE,
  DELETE_LOCATION_REQUEST,
  DELETE_LOCATION_SUCCESS,
  DELETE_LOCATION_FAILURE,
  ADD_LOCATION_REQUEST,
  ADD_LOCATION_SUCCESS,
  ADD_LOCATION_FAILURE
} from "./actionTypes";

// GET

function createGetLocationsRequest() {
  return { type: GET_LOCATIONS_REQUEST };
}

function createGetLocationsSuccess(entities) {
  return { type: GET_LOCATIONS_SUCCESS, entities };
}

function createGetLocationsFailure(error) {
  return { type: GET_LOCATIONS_FAILURE, error };
}

// DELETE

function createDeleteLocationRequest(id) {
  return { type: DELETE_LOCATION_REQUEST, id };
}

function createDeleteLocationSuccess(id) {
  return { type: DELETE_LOCATION_SUCCESS, id };
}

function createDeleteLocationFailure(error) {
  return { type: DELETE_LOCATION_FAILURE, error };
}

// ADD

function createAddLocationRequest(entity) {
  return { type: ADD_LOCATION_REQUEST, entity };
}

function createAddLocationSuccess(entity) {
  return { type: ADD_LOCATION_SUCCESS, entity };
}

function createAddLocationFailure(error) {
  return { type: ADD_LOCATION_FAILURE, error };
}

export function getLocations() {
  return dispatch => {
    dispatch(createGetLocationsRequest());
    return model
      .getLocations()
      .then(response => {
        dispatch(createGetLocationsSuccess(response.data));
      })
      .catch(response => {
        dispatch(createGetLocationsFailure(response));
      });
  };
}

export function addLocation(property) {
  return dispatch => {
    dispatch(createAddLocationRequest());
    return model
      .addLocation(property)
      .then(response => {
        dispatch(createAddLocationSuccess(response.data));
      })
      .catch(response => {
        dispatch(createAddLocationFailure(response));
      });
  };
}

export function deleteLocation(id) {
  return dispatch => {
    dispatch(createDeleteLocationRequest());
    return model
      .deleteLocation(id)
      .then(() => {
        dispatch(createDeleteLocationSuccess(id));
      })
      .catch(response => {
        dispatch(createDeleteLocationFailure(response));
      });
  };
}
