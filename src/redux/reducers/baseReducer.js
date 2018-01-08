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
    getByIdSuccess,
    addSuccess,
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

    case getSuccess:
      console.log(action);
      return Object.assign({}, state, {
        list: action.entities,
        loading: false
      });

    case getByIdSuccess:
      return Object.assign({}, state, {
        selected: action.entity,
        loading: false
      });

    case addSuccess:
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
