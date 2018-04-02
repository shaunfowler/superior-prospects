import React from "react";
import { NavLink, Link } from "react-router-dom";
import ReactGA from "react-ga";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";

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
        <Typography variant="title" color="inherit">
          Superior Prospects Inc.
        </Typography>
      </Link>
      <NavLink exact className="navbar-item" to="/" activeClassName="active">
        <Button color="inherit" size="large">
          Home
        </Button>
      </NavLink>
      <NavLink
        exact
        className="navbar-item"
        to="/contact"
        activeClassName="active"
      >
        <Button color="inherit" size="large">
          Contact
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
