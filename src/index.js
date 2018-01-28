import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import "bulma/css/bulma.css";
import configureStore from "./redux/store/configureStore";
// import { history } from "./redux/store/configureStore";
import "./index.less";
import App from "./containers/App";
import withTracker from "./hocs/withTracker";

const store = configureStore();

render(
  <Provider store={store}>
    <BrowserRouter>
      <Route component={withTracker(App, {})} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
