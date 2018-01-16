import axios from "axios";

export const USER_ACTION_NAMES = {
  request: "GET_USER_REQUEST",
  getSuccess: "GET_USER_SUCCESS",
  failure: "GET_USER_FAILURE"
};

function createUserRequest() {
  return { type: USER_ACTION_NAMES.request };
}

function createUserFailure(error) {
  return { type: USER_ACTION_NAMES.failure, error };
}

// GET

function createGetUserSuccess(entity) {
  return { type: USER_ACTION_NAMES.getSuccess, entity };
}

export function getUser() {
  return dispatch => {
    dispatch(createUserRequest());
    return axios
      .get("/api/user")
      .then(response => {
        dispatch(createGetUserSuccess(response.data));
      })
      .catch(response => {
        dispatch(createUserFailure(response));
      });
  };
}
