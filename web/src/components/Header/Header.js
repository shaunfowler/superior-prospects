import React from "react";
import { NavLink, Link } from "react-router-dom";
import ReactGA from "react-ga4";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const trackHeaderLink = () => {
  ReactGA.event({
    category: "Navigation",
    action: "Logo home link"
  });
};

const Header = () => (
  <AppBar className="app-bar container" position="static">
    <Toolbar className="header container">
      <Link to="/" onClick={() => trackHeaderLink()} className="logo">
        <Typography variant="h6" color="inherit">
          Superior Prospects Inc.
        </Typography>
      </Link>
      <NavLink exact className="navbar-item" to="/" activeClassName="active">
        <Button color="inherit" size="large">
          Properties
        </Button>
      </NavLink>
      <NavLink
        exact
        className="navbar-item"
        to="/about"
        activeClassName="active"
      >
        <Button color="inherit" size="large">
          About
        </Button>
      </NavLink>
    </Toolbar>
  </AppBar>
);

export default Header;
