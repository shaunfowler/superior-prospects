import baseReducer from "./baseReducer";
import { asyncActionNames } from "../actions/actionUtils";

describe("updatesReducer", () => {
  const TEST_ACTION_NAMES = asyncActionNames("TEST");

  it("should return initial state", () => {
    expect(baseReducer(undefined, {}, TEST_ACTION_NAMES)).toEqual({
      loading: false,
      error: null,
      list: [],
      selected: null
    });
  });

  // Request and failure

  it("should set loading state", () => {
    expect(
      baseReducer(
        undefined,
        { type: TEST_ACTION_NAMES.request },
        TEST_ACTION_NAMES
      )
    ).toEqual({
      loading: true,
      error: null,
      list: [],
      selected: null
    });
  });

  it("should set error object", () => {
    const error = new Error("oh no!");
    expect(
      baseReducer(
        undefined,
        { type: TEST_ACTION_NAMES.failure, error },
        TEST_ACTION_NAMES
      )
    ).toEqual({
      loading: false,
      error: error,
      list: [],
      selected: null
    });
  });

  // Query

  it("should populate the list", () => {
    const entities = [
      { id: 1, created: new Date(), body: "test1" },
      { id: 2, created: new Date(), body: "test2" }
    ];
    expect(
      baseReducer(
        undefined,
        { type: TEST_ACTION_NAMES.querySuccess, entities },
        TEST_ACTION_NAMES
      )
    ).toEqual({
      loading: false,
      error: null,
      list: entities,
      selected: null
    });
  });

  // Get by ID

  it("should populate the selected item", () => {
    const entity = { id: 1, created: new Date(), body: "test1" };
    expect(
      baseReducer(
        undefined,
        { type: TEST_ACTION_NAMES.getSuccess, entity },
        TEST_ACTION_NAMES
      )
    ).toEqual({
      loading: false,
      error: null,
      list: [],
      selected: entity
    });
  });

  // Create

  it("should add to the list", () => {
    const entity = { id: 1, created: new Date(), body: "test" };
    expect(
      baseReducer(
        undefined,
        { type: TEST_ACTION_NAMES.createSuccess, entity },
        TEST_ACTION_NAMES
      )
    ).toEqual({
      loading: false,
      error: null,
      list: [entity],
      selected: null
    });
  });

  // Delete

  it("should remove from the list", () => {
    const entity = { id: 1, created: new Date(), body: "test" };
    const initialState = {
      loading: false,
      error: null,
      list: [entity],
      selected: null
    };

    const newState = {
      loading: false,
      error: null,
      list: [],
      selected: null
    };

    expect(
      baseReducer(
        initialState,
        {
          type: TEST_ACTION_NAMES.deleteSuccess,
          _id: entity._id
        },
        TEST_ACTION_NAMES
      )
    ).toEqual(newState);
  });

  // Edit

  it("should edit and item in the list", () => {
    const entity = { _id: 1, created: new Date(), body: "test" };
    const editedEntity = {
      ...entity,
      body: "test new body"
    };

    const initialState = {
      loading: false,
      error: null,
      list: [entity],
      selected: null
    };

    const newState = {
      loading: false,
      error: null,
      list: [editedEntity],
      selected: null
    };

    expect(
      baseReducer(
        initialState,
        {
          type: TEST_ACTION_NAMES.editSuccess,
          entity: {
            _id: entity._id,
            body: editedEntity.body
          }
        },
        TEST_ACTION_NAMES
      )
    ).toEqual(newState);
  });
});
