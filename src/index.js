import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import "bulma/css/bulma.css";
import configureStore from "./redux/store/configureStore";
import { history } from "./redux/store/configureStore";
import "./index.css";
import App from "./containers/App";
import withTracker from "./hocs/withTracker";

const store = configureStore();

render(
  <Provider store={store}>
    <ConnectedRouter>
      <Route component={withTracker(App, {})} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
