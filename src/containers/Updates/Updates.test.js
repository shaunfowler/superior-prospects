import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Home from "./";

const mockStore = configureStore([thunk]);

it("renders when unauthenticated", () => {
  const initialState = {
    updates: {
      loading: false,
      list: []
    },
    properties: {
      loading: false,
      list: []
    },
    locations: {
      loading: false,
      list: []
    },
    user: {
      isAuthenticated: false
    }
  };
  const store = mockStore(initialState);
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <Home store={store} />
    </MemoryRouter>,
    div
  );
});

it("renders when authenticated", () => {
  const initialState = {
    updates: {
      loading: false,
      list: []
    },
    properties: {
      loading: false,
      list: []
    },
    locations: {
      loading: false,
      list: []
    },
    user: {
      isAuthenticated: true
    }
  };
  const store = mockStore(initialState);
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <Home store={store} />
    </MemoryRouter>,
    div
  );
});
