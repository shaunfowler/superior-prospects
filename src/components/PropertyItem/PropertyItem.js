import React from "react";
import { Link } from "react-router-dom";
import { ListItem, ListItemText } from "material-ui";
import "./PropertyItem.less";

const PropertyItem = ({ safeName, name, description }) => (
  <Link to={`/properties/${safeName}`} className="property-item">
    <ListItem>
      <ListItemText primary={name} secondary={description} />
    </ListItem>
  </Link>
);

export default PropertyItem;
