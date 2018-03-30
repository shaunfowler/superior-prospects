import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { ListItem, ListItemText, Typography } from "material-ui";
import "./PropertyItem.less";

const PropertyItem = ({
  safeName,
  name,
  description,
  created,
  locationName
}) => (
  <Link to={`/properties/${safeName}`} className="property-item">
    <ListItem>
      <ListItemText
        primary={
          <div>
            <span className="property-item__name">{name}</span>
            {locationName && (
              <span>
                {" "}
                &middot;{" "}
                <span className="property-item__location">{locationName}</span>
              </span>
            )}
            {created && (
              <div className="property-item__created">
                {moment(created).format("MMMM D, YYYY")}
              </div>
            )}
          </div>
        }
        secondary={description}
      >
        <Typography>{name}</Typography>
        <Typography>{description}</Typography>
      </ListItemText>
    </ListItem>
  </Link>
);

export default PropertyItem;
