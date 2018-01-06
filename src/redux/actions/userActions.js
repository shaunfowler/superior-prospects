import * as model from "../models/user";
import {
  GET_USER_REQUEST,
  GET_USER_FAILURE,
  GET_USER_SUCCESS
} from "./actionTypes";

function createUserRequest() {
  return { type: GET_USER_REQUEST };
}

function createUserFailure(error) {
  return { type: GET_USER_FAILURE, error };
}

// GET

function createGetUserSuccess(entity) {
  return { type: GET_USER_SUCCESS, entity };
}

export function getUser() {
  return dispatch => {
    dispatch(createUserRequest());
    return model
      .getUser()
      .then(response => {
        dispatch(createGetUserSuccess(response.data));
      })
      .catch(response => {
        dispatch(createUserFailure(response));
      });
  };
}
