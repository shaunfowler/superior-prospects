import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <nav className="navbar header" aria-label="main navigation">
    <div className="container">
      <div className="navbar-brand">
        <Link className="navbar-item is-size-5 has-text-weight-bold" to="/">
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
