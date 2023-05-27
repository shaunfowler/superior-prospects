import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import ReactGA from "react-ga4";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { blue, orange } from "@material-ui/core/colors";
import store, { history } from "./redux/store/configureStore";
import "./index.less";
import App from "./containers/App";

ReactGA.initialize(process.env.GA_TRACKING_ID, {
  debug: process.env.NODE_ENV === "development"
});

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: orange
  }
});

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
