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
            <span className="property-name">{name}</span>
            {locationName && (
              <span>
                {" "}
                &middot;{" "}
                <span style={{ fontSize: "14px", opacity: 0.7 }}>
                  {locationName}
                </span>
              </span>
            )}
            {created && (
              <div style={{ fontSize: "14px" }}>
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
