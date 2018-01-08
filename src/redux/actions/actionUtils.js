export const asyncActionNames = baseName => ({
  failure: `${baseName}_FAILURE`,
  request: `${baseName}_REQUEST`,
  querySuccess: `${baseName}_QUERY_SUCCESS`,
  getSuccess: `${baseName}_GET_SUCCESS`,
  addSuccess: `${baseName}_ADD_SUCCESS`,
  editSuccess: `${baseName}_EDIT_SUCCESS`,
  deleteSuccess: `${baseName}_DELETE_SUCCESS`
});

export const buildAsyncActions = actionName => ({
  request: () => ({
    type: actionName.request
  }),
  failure: error => ({
    type: actionName.failure,
    error
  }),
  querySuccess: data => ({
    type: actionName.querySuccess,
    data
  }),
  getSuccess: data => ({
    type: actionName.getSuccess,
    data
  }),
  editSuccess: data => ({
    type: actionName.updateSuccess,
    data
  }),
  deleteSuccess: data => ({
    type: actionName.deleteSuccess,
    data
  })
});
