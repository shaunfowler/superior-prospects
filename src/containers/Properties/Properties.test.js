import React from "react";
import ReactDOM from "react-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Properties from "./Properties";

const mockStore = configureStore([thunk]);

it("renders without crashing", () => {
  const initialState = {
    locations: {
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
  ReactDOM.render(<Properties store={store} />, div);
});
