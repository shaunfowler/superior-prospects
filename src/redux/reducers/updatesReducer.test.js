import * as types from "../actions/actionTypes";
import updatesReducer from "./updatesReducer";

describe("updatesReducer", () => {
  it("should return initial state", () => {
    expect(updatesReducer(undefined, {})).toEqual({
      loading: false,
      error: null,
      list: []
    });
  });

  // Get

  it("should set loading state while getting list", () => {
    expect(
      updatesReducer(undefined, { type: types.GET_UPDATES_REQUEST })
    ).toEqual({
      loading: true,
      error: null,
      list: []
    });
  });

  it("should populate the list", () => {
    const entities = [
      { id: 1, created: new Date(), body: "test1" },
      { id: 2, created: new Date(), body: "test2" }
    ];
    expect(
      updatesReducer(undefined, { type: types.GET_UPDATES_SUCCESS, entities })
    ).toEqual({
      loading: false,
      error: null,
      list: entities
    });
  });

  it("should set error object when get fails", () => {
    const error = new Error("oh no!");
    expect(
      updatesReducer(undefined, { type: types.GET_UPDATES_FAILURE, error })
    ).toEqual({
      loading: false,
      error: error,
      list: []
    });
  });

  // Add

  it("should set loading state while adding", () => {
    expect(
      updatesReducer(undefined, { type: types.ADD_UPDATE_REQUEST })
    ).toEqual({
      loading: true,
      error: null,
      list: []
    });
  });

  it("should add update to the list", () => {
    const entity = { id: 1, created: new Date(), body: "test" };
    expect(
      updatesReducer(undefined, { type: types.ADD_UPDATE_SUCCESS, entity })
    ).toEqual({
      loading: false,
      error: null,
      list: [entity]
    });
  });

  it("should set error object when add fails", () => {
    const error = new Error("oh no!");
    expect(
      updatesReducer(undefined, { type: types.ADD_UPDATE_FAILURE, error })
    ).toEqual({
      loading: false,
      error: error,
      list: []
    });
  });

  // Delete

  it("should set loading state while deleting", () => {
    expect(
      updatesReducer(undefined, { type: types.DELETE_UPDATE_REQUEST })
    ).toEqual({
      loading: true,
      error: null,
      list: []
    });
  });

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
      updatesReducer(initialState, {
        type: types.DELETE_UPDATE_SUCCESS,
        _id: entity._id
      })
    ).toEqual(newState);
  });

  it("should set error object when delete fails", () => {
    const error = new Error("oh no!");
    expect(
      updatesReducer(undefined, { type: types.DELETE_UPDATE_FAILURE, error })
    ).toEqual({
      loading: false,
      error: error,
      list: []
    });
  });
});
