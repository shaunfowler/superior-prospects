import React from "react";
import ReactDOM from "react-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Home from "./";

const mockStore = configureStore([thunk]);

it("renders without crashing", () => {
  const initialState = {
    updates: {
      loading: false,
      list: []
    },
    properties: {
      loading: false,
      list: []
    }
  };
  const store = mockStore(initialState);
  const div = document.createElement("div");
  ReactDOM.render(<Home store={store} />, div);
});
