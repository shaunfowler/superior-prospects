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
    request,
    failure,
    getSuccess,
    addSuccess,
    deleteSuccess
  } = actionMappings;

  switch (action.type) {
    case request:
      return Object.assign({}, state, {
        loading: true
      });

    case failure:
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
