const initialState = {
  loading: false,
  error: null,
  list: [],
  selected: null
};

export default function baseReducer(
  state = initialState,
  action,
  actionMappings
) {
  const {
    request,
    failure,
    querySuccess,
    getSuccess,
    editSuccess,
    createSuccess,
    deleteSuccess
  } = actionMappings;

  switch (action.type) {
    case request:
      return Object.assign({}, state, {
        loading: true
      });

    case failure:
      return Object.assign({}, state, {
        error: action.error,
        loading: false
      });

    case querySuccess:
      return Object.assign({}, state, {
        list: action.entities,
        loading: false
      });

    case getSuccess:
      return Object.assign({}, state, {
        selected: action.entity,
        loading: false
      });

    case editSuccess:
      // TODO
      return Object.assign({}, state, {});

    case createSuccess:
      return Object.assign({}, state, {
        list: [...state.list, action.entity],
        loading: false,
        error: null
      });

    case deleteSuccess:
      return Object.assign({}, state, {
        list: [...state.list].filter(x => x._id !== action.id),
        loading: false,
        error: null
      });

    default:
      return state;
  }
}
