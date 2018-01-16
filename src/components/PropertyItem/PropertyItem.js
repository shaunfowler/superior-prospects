import React from "react";
import { Link } from "react-router-dom";
import "./PropertyItem.css";

const PropertyItem = ({ id, name, description }) => (
  <div className="propertyItem">
    <div className="is-size-5 has-text-weight-bold">
      <Link to={`/properties/${id}`}>{name}</Link>
    </div>
    <div className="has-text-grey">{description}</div>
  </div>
);

export default PropertyItem;
