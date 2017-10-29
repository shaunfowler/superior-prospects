import React from "react";
import { Link } from "react-router-dom";

const separator = () => <span>&nbsp;&mdash;&nbsp;</span>;

const Header = () => (
  <h1 className="header">
    Header{" "}
    <small>
      <Link to="/">Home</Link>
      {separator()}
      <Link to="/properties">Properties</Link>
      {separator()}
      <Link to="/about">About</Link>
    </small>
  </h1>
);

export default Header;
