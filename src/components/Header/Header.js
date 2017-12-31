import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <nav className="navbar header" role="navigation" aria-label="main navigation">
    <div className="container">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          Superior Prospects Inc.
        </a>

        <button className="button navbar-burger">
          <span />
          <span />
          <span />
        </button>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end">
          <Link className="navbar-item" to="/">
            Home
          </Link>
          <Link className="navbar-item" to="/properties">
            Properties
          </Link>
          <Link className="navbar-item" to="/about">
            About
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

export default Header;
