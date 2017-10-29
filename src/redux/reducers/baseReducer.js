const initialState = {
  loading: false,
  error: null,
  list: []
};

export default function baseReducer(
  state = initialState,
  action,
  actionMappings
) {
  const {
    getRequest,
    addRequest,
    deleteRequest,
    getFailure,
    addFailure,
    deleteFailure,
    getSuccess,
    addSuccess,
    deleteSuccess
  } = actionMappings;

  switch (action.type) {
    case getRequest:
    case addRequest:
    case deleteRequest:
      return Object.assign({}, state, {
        loading: true
      });

    case getFailure:
    case addFailure:
    case deleteFailure:
      const { error } = action;
      return Object.assign({}, state, {
        error,
        loading: false
      });

    case getSuccess:
      const { entities } = action;
      return Object.assign({}, state, {
        list: entities,
        loading: false
      });

    case addSuccess:
      const { entity } = action;
      return Object.assign({}, state, {
        list: [...state.list, entity],
        loading: false,
        error: null
      });

    case deleteSuccess:
      const { id } = action;
      return Object.assign({}, state, {
        list: [...state.list].filter(x => x._id !== id),
        loading: false,
        error: null
      });

    default:
      return state;
  }
}
