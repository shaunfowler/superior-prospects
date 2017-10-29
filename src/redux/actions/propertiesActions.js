import * as model from "../models/properties";
import {
  GET_PROPERTIES_REQUEST,
  GET_PROPERTIES_SUCCESS,
  GET_PROPERTIES_FAILURE,
  DELETE_PROPERTY_REQUEST,
  DELETE_PROPERTY_SUCCESS,
  DELETE_PROPERTY_FAILURE,
  ADD_PROPERTY_REQUEST,
  ADD_PROPERTY_SUCCESS,
  ADD_PROPERTY_FAILURE
} from "./actionTypes";

// GET

function createGetPropertiesRequest() {
  return { type: GET_PROPERTIES_REQUEST };
}

function createGetPropertiesSuccess(entities) {
  return { type: GET_PROPERTIES_SUCCESS, entities };
}

function createGetPropertiesFailure(error) {
  return { type: GET_PROPERTIES_FAILURE, error };
}

// DELETE

function createDeletePropertyRequest(id) {
  return { type: DELETE_PROPERTY_REQUEST, id };
}

function createDeletePropertySuccess(id) {
  return { type: DELETE_PROPERTY_SUCCESS, id };
}

function createDeletePropertyFailure(error) {
  return { type: DELETE_PROPERTY_FAILURE, error };
}

// ADD

function createAddPropertyRequest(entity) {
  return { type: ADD_PROPERTY_REQUEST, entity };
}

function createAddPropertySuccess(entity) {
  return { type: ADD_PROPERTY_SUCCESS, entity };
}

function createAddPropertyFailure(error) {
  return { type: ADD_PROPERTY_FAILURE, error };
}

export function getProperties() {
  return dispatch => {
    dispatch(createGetPropertiesRequest());
    return model
      .getProperties()
      .then(response => {
        dispatch(createGetPropertiesSuccess(response.data));
      })
      .catch(response => {
        dispatch(createGetPropertiesFailure(response));
      });
  };
}

export function addProperty(property) {
  return dispatch => {
    dispatch(createAddPropertyRequest());
    return model
      .addProperty(property)
      .then(response => {
        dispatch(createAddPropertySuccess(response.data));
      })
      .catch(response => {
        dispatch(createAddPropertyFailure(response));
      });
  };
}

export function deleteProperty(id) {
  return dispatch => {
    dispatch(createDeletePropertyRequest());
    return model
      .deleteProperty(id)
      .then(() => {
        dispatch(createDeletePropertySuccess(id));
      })
      .catch(response => {
        dispatch(createDeletePropertyFailure(response));
      });
  };
}
