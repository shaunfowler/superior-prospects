import React from "react";
import moment from "moment";

const getYear = () => moment().format("YYYY");

const Footer = () => (
  <footer className="copyrightNote">{`Superior Prospects Inc. © ${getYear()}`}</footer>
);

export default Footer;
