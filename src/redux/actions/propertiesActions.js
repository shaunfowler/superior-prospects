import axios from "axios";
import {
  PROPERTIES_REQUEST,
  PROPERTIES_FAILURE,
  GET_PROPERTIES_SUCCESS,
  GET_PROPERTY_SUCCESS,
  DELETE_PROPERTY_SUCCESS,
  ADD_PROPERTY_SUCCESS
} from "./actionTypes";

function createPropertiesRequest() {
  return { type: PROPERTIES_REQUEST };
}

function createPropertiesFailure(error) {
  return { type: PROPERTIES_FAILURE, error };
}

// GET all

function createGetPropertiesSuccess(entities) {
  return { type: GET_PROPERTIES_SUCCESS, entities };
}

// GET by ID

function createGetPropertySuccess(entity) {
  return { type: GET_PROPERTY_SUCCESS, entity };
}

// DELETE

function createDeletePropertySuccess(id) {
  return { type: DELETE_PROPERTY_SUCCESS, id };
}

// ADD

function createAddPropertySuccess(entity) {
  return { type: ADD_PROPERTY_SUCCESS, entity };
}

export function getProperties() {
  return dispatch => {
    dispatch(createPropertiesRequest());
    return axios
      .get("/api/properties/visible")
      .then(response => {
        dispatch(createGetPropertiesSuccess(response.data));
      })
      .catch(response => {
        dispatch(createPropertiesFailure(response));
      });
  };
}

export function getProperty(id) {
  return dispatch => {
    dispatch(createPropertiesRequest());
    return Promise.all([
      axios.get(`/api/properties/${id}`),
      axios.get(`/api/properties/${id}/media`)
    ])
      .then(responses => {
        const propertyResponse = responses[0].data;
        const mediaResponse = responses[1].data;
        dispatch(
          createGetPropertySuccess(
            Object.assign({}, propertyResponse, { media: [...mediaResponse] })
          )
        );
      })
      .catch(response => {
        dispatch(createPropertiesFailure(response));
      });
  };
}

export function addProperty(property) {
  return dispatch => {
    dispatch(createPropertiesRequest());
    return axios
      .post("/api/properties", property)
      .then(response => {
        dispatch(createAddPropertySuccess(response.data));
      })
      .catch(response => {
        dispatch(createPropertiesFailure(response));
      });
  };
}

export function deleteProperty(id) {
  return dispatch => {
    dispatch(createPropertiesRequest());
    return axios
      .delete(`/api/properties/${id}`)
      .then(() => {
        dispatch(createDeletePropertySuccess(id));
      })
      .catch(response => {
        dispatch(createPropertiesFailure(response));
      });
  };
}
