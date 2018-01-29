import React from "react";
import { NavLink, Link } from "react-router-dom";
import ReactGA from "react-ga";
import HeaderImage from "../../assets/header-clear.jpg";

const trackHeaderLink = () => {
  ReactGA.event({
    category: "Navigation",
    action: "Logo home link"
  });
};

const Header = () => (
  <div className="header">
    <nav className="navbar is-dark " aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link
            className="navbar-item is-size-5 has-text-weight-bold"
            to="/"
            onClick={() => trackHeaderLink()}
          >
            Superior Prospects Inc.
          </Link>

          <button className="button navbar-burger">
            <span />
            <span />
            <span />
          </button>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            <NavLink
              exact
              className="navbar-item"
              to="/"
              activeClassName="active"
            >
              Home
            </NavLink>
            <NavLink
              exact
              className="navbar-item"
              to="/properties"
              activeClassName="active"
            >
              Properties
            </NavLink>
            <NavLink
              exact
              className="navbar-item"
              to="/about"
              activeClassName="active"
            >
              About
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
    <div
      className="jumbotron"
      style={{ backgroundImage: `url('${HeaderImage}')` }}
    />
  </div>
);

export default Header;
