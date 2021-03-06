export const asyncActionNames = baseName => ({
  failure: `${baseName}_FAILURE`,
  request: `${baseName}_REQUEST`,
  querySuccess: `${baseName}_QUERY_SUCCESS`,
  getSuccess: `${baseName}_GET_SUCCESS`,
  createSuccess: `${baseName}_CREATE_SUCCESS`,
  editSuccess: `${baseName}_EDIT_SUCCESS`,
  deleteSuccess: `${baseName}_DELETE_SUCCESS`
});

export const buildAsyncActions = actionName => ({
  request: () => ({
    type: actionName.request
  }),
  failure: error => ({
    type: actionName.failure,
    error: JSON.stringify(error)
  }),
  querySuccess: entities => ({
    type: actionName.querySuccess,
    entities
  }),
  getSuccess: entity => ({
    type: actionName.getSuccess,
    entity
  }),
  createSuccess: entity => ({
    type: actionName.createSuccess,
    entity
  }),
  editSuccess: entity => ({
    type: actionName.editSuccess,
    entity
  }),
  deleteSuccess: id => ({
    type: actionName.deleteSuccess,
    id
  })
});
