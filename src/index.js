import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import ReactGA from "react-ga";
import "bulma/css/bulma.css";
import store, { history } from "./redux/store/configureStore";
import "./index.less";
import App from "./containers/App";

ReactGA.initialize("UA-78822442-1", { debug: true });

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
