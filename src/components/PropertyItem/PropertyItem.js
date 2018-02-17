import React from "react";
import { Link } from "react-router-dom";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "material-ui";
import { MoreVert as MoreVertIcon } from "material-ui-icons";
import "./PropertyItem.less";

const PropertyItem = ({ safeName, name, description }) => (
  <Link to={`/properties/${safeName}`}>
    <ListItem>
      <ListItemText primary={name} secondary={description} />
      <ListItemSecondaryAction>
        <IconButton aria-label="More">
          <MoreVertIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  </Link>
);

export default PropertyItem;
