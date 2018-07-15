import React from "react";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Properties from "./";

const mockStore = configureStore([thunk]);

describe("Properties container", () => {
  it("renders when not authenticated", () => {
    const initialState = {
      locations: {
        loading: false,
        list: []
      },
      properties: {
        loading: false,
        list: []
      },
      user: {}
    };
    const store = mockStore(initialState);
    const output = shallow(<Properties store={store} />).dive();
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it("renders when authenticated", () => {
    const initialState = {
      locations: {
        loading: false,
        list: []
      },
      properties: {
        loading: false,
        list: []
      },
      user: { isAuthenticated: true }
    };
    const store = mockStore(initialState);
    const output = shallow(<Properties store={store} />).dive();
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it("renders with properties and locations", () => {
    const initialState = {
      locations: {
        loading: false,
        list: [{ _id: "abc", name: "loc 1" }]
      },
      properties: {
        loading: false,
        list: [{ _id: "123", name: "prop 1", locationRefId: "abc" }]
      },
      user: {}
    };
    const store = mockStore(initialState);
    const output = shallow(<Properties store={store} />).dive();
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
