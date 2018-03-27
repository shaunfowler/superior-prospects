import axios from "axios";
import { asyncActionNames, buildAsyncActions } from "./actionUtils";

export const MEDIA_ACTION_NAMES = asyncActionNames("MEDIA");
export const MEDIA_ACTIONS = buildAsyncActions(MEDIA_ACTION_NAMES);

export const createMedia = (file, propertyId) => {
  return dispatch => {
    dispatch(MEDIA_ACTIONS.request());
    const formData = new FormData();
    formData.append("media", file);
    return axios
      .post(`/api/media/${propertyId}`, formData, {})
      .then(response => {
        dispatch(MEDIA_ACTIONS.createSuccess(response.data));
      })
      .catch(response => {
        dispatch(MEDIA_ACTIONS.failure(response));
      });
  };
};
