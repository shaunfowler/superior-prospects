import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./PropertyItem.less";

const PropertyItem = ({ safeName, name, description, created }) => (
  <div className="propertyItem">
    <div className="is-size-5 has-text-weight-bold">
      <Link to={`/properties/${safeName}`}>{name}</Link>
    </div>
    {created && (
      <div className="has-text-weight-bold">
        {moment(created).format("MMMM D, YYYY")}
      </div>
    )}
    <div className="has-text-grey description">{description}</div>
  </div>
);

export default PropertyItem;
