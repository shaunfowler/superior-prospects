import baseReducer from "./baseReducer";

describe("updatesReducer", () => {
  const REQUEST = "REQUEST";
  const FAILURE = "FAILURE";
  const GET_SUCCESS = "GET_SUCCESS";
  const ADD_SUCCESS = "ADD_SUCCESS";
  const DELETE_SUCCESS = "DELETE_SUCCESS";

  const actionMappings = {
    request: REQUEST,
    failure: FAILURE,
    getSuccess: GET_SUCCESS,
    addSuccess: ADD_SUCCESS,
    deleteSuccess: DELETE_SUCCESS
  };

  it("should return initial state", () => {
    expect(baseReducer(undefined, {}, actionMappings)).toEqual({
      loading: false,
      error: null,
      list: []
    });
  });

  // Request and failure

  it("should set loading state", () => {
    expect(baseReducer(undefined, { type: REQUEST }, actionMappings)).toEqual({
      loading: true,
      error: null,
      list: []
    });
  });

  it("should set error object", () => {
    const error = new Error("oh no!");
    expect(
      baseReducer(undefined, { type: FAILURE, error }, actionMappings)
    ).toEqual({
      loading: false,
      error: error,
      list: []
    });
  });

  // Get

  it("should populate the list", () => {
    const entities = [
      { id: 1, created: new Date(), body: "test1" },
      { id: 2, created: new Date(), body: "test2" }
    ];
    expect(
      baseReducer(undefined, { type: GET_SUCCESS, entities }, actionMappings)
    ).toEqual({
      loading: false,
      error: null,
      list: entities
    });
  });

  // Add

  it("should add to the list", () => {
    const entity = { id: 1, created: new Date(), body: "test" };
    expect(
      baseReducer(undefined, { type: ADD_SUCCESS, entity }, actionMappings)
    ).toEqual({
      loading: false,
      error: null,
      list: [entity]
    });
  });

  // Delete

  it("should remove from the list", () => {
    const entity = { id: 1, created: new Date(), body: "test" };
    const initialState = {
      loading: false,
      error: null,
      list: [entity]
    };

    const newState = {
      loading: false,
      error: null,
      list: []
    };

    expect(
      baseReducer(
        initialState,
        {
          type: DELETE_SUCCESS,
          _id: entity._id
        },
        actionMappings
      )
    ).toEqual(newState);
  });
});
