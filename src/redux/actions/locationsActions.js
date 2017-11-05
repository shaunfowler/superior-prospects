import * as model from "../models/locations";
import {
  LOCATIONS_REQUEST,
  LOCATIONS_FAILURE,
  GET_LOCATIONS_SUCCESS,
  DELETE_LOCATION_SUCCESS,
  ADD_LOCATION_SUCCESS
} from "./actionTypes";

function createLocationsRequest() {
  return { type: LOCATIONS_REQUEST };
}

function createLocationsFailure(error) {
  return { type: LOCATIONS_FAILURE, error };
}

// GET

function createGetLocationsSuccess(entities) {
  return { type: GET_LOCATIONS_SUCCESS, entities };
}

// DELETE

function createDeleteLocationSuccess(id) {
  return { type: DELETE_LOCATION_SUCCESS, id };
}

// ADD

function createAddLocationSuccess(entity) {
  return { type: ADD_LOCATION_SUCCESS, entity };
}

export function getLocations() {
  return dispatch => {
    dispatch(createLocationsRequest());
    return model
      .getLocations()
      .then(response => {
        dispatch(createGetLocationsSuccess(response.data));
      })
      .catch(response => {
        dispatch(createLocationsFailure(response));
      });
  };
}

export function addLocation(property) {
  return dispatch => {
    dispatch(createLocationsRequest());
    return model
      .addLocation(property)
      .then(response => {
        dispatch(createAddLocationSuccess(response.data));
      })
      .catch(response => {
        dispatch(createLocationsFailure(response));
      });
  };
}

export function deleteLocation(id) {
  return dispatch => {
    dispatch(createLocationsRequest());
    return model
      .deleteLocation(id)
      .then(() => {
        dispatch(createDeleteLocationSuccess(id));
      })
      .catch(response => {
        dispatch(createLocationsFailure(response));
      });
  };
}
