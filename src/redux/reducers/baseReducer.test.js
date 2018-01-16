import baseReducer from "./baseReducer";
import { asyncActionNames, buildAsyncActions } from "../actions/actionUtils";

describe("updatesReducer", () => {
  const TEST_ACTION_NAMES = asyncActionNames("TEST");

  it("should return initial state", () => {
    expect(baseReducer(undefined, {}, TEST_ACTION_NAMES)).toEqual({
      loading: false,
      error: null,
      list: []
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
      list: []
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
      list: []
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
      list: entities
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
          type: TEST_ACTION_NAMES.deleteSuccess,
          _id: entity._id
        },
        TEST_ACTION_NAMES
      )
    ).toEqual(newState);
  });
});
