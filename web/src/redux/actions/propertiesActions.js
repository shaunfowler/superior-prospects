import axios from "axios";
import { asyncActionNames, buildAsyncActions } from "./actionUtils";

export const PROPERTY_ACTION_NAMES = asyncActionNames("PROPERTY");
export const PROPERTY_ACTIONS = buildAsyncActions(PROPERTY_ACTION_NAMES);

export const queryProperties = () => {
  return dispatch => {
    dispatch(PROPERTY_ACTIONS.request());
    return axios
      .get("/api/properties/visible")
      .then(response => {
        dispatch(PROPERTY_ACTIONS.querySuccess(response.data));
      })
      .catch(response => {
        dispatch(PROPERTY_ACTIONS.failure(response));
      });
  };
};

export const getProperty = id => {
  return dispatch => {
    dispatch(PROPERTY_ACTIONS.request());
    return Promise.all([
      axios.get(`/api/properties/${id}`),
      axios.get(`/api/properties/${id}/media`)
    ])
      .then(responses => {
        const propertyResponse = responses[0].data;
        const mediaResponse = responses[1].data;
        dispatch(
          PROPERTY_ACTIONS.getSuccess(
            Object.assign({}, propertyResponse, { media: [...mediaResponse] })
          )
        );
        return propertyResponse;
      })
      .catch(response => {
        dispatch(PROPERTY_ACTIONS.failure(response));
        throw response;
      });
  };
};

export const createProperty = property => {
  return dispatch => {
    dispatch(PROPERTY_ACTIONS.request());
    return axios
      .post("/api/properties", property)
      .then(response => {
        dispatch(PROPERTY_ACTIONS.createSuccess(response.data));
      })
      .catch(response => {
        dispatch(PROPERTY_ACTIONS.failure(response));
      });
  };
};

export const editProperty = property => {
  const { _id } = property;
  return dispatch => {
    dispatch(PROPERTY_ACTIONS.request());
    return axios
      .put(`/api/properties/${_id}`, property)
      .then(response => {
        dispatch(PROPERTY_ACTIONS.editSuccess(response.data));
      })
      .catch(response => {
        dispatch(PROPERTY_ACTIONS.failure(response));
      });
  };
};

export const deleteProperty = id => {
  return dispatch => {
    dispatch(PROPERTY_ACTIONS.request());
    return axios
      .delete(`/api/properties/${id}`)
      .then(() => {
        dispatch(PROPERTY_ACTIONS.deleteSuccess(id));
      })
      .catch(response => {
        dispatch(PROPERTY_ACTIONS.failure(response));
      });
  };
};
