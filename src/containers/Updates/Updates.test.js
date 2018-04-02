import React from "react";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Updates from "./";

const mockStore = configureStore([thunk]);

describe("Updates container", () => {
  const update = {
    _id: "abc",
    title: "test title",
    body: "test body",
    created: "test created"
  };

  it("renders when unauthenticated", () => {
    const initialState = {
      updates: {
        loading: false,
        list: [update]
      },
      user: {
        isAuthenticated: false
      }
    };
    const store = mockStore(initialState);

    const output = shallow(
      <MemoryRouter>
        <Updates store={store} />
      </MemoryRouter>
    )
      .dive()
      .dive()
      .dive();

    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it("renders when authenticated", () => {
    const initialState = {
      updates: {
        loading: false,
        list: [update]
      },
      user: {
        isAuthenticated: true
      }
    };
    const store = mockStore(initialState);

    const output = shallow(
      <MemoryRouter>
        <Updates store={store} />
      </MemoryRouter>
    )
      .dive()
      .dive()
      .dive();

    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
