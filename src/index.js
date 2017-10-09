import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./redux/store/configureStore";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./containers/App";

const store = configureStore();

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
