import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import ReactGA from "react-ga";
import { createMuiTheme, MuiThemeProvider } from "material-ui/styles";
import { blue, orange } from "material-ui/colors";
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
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
