import React from "react";
import moment from "moment";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "material-ui";
import { MoreVert as MoreVertIcon } from "material-ui-icons";
import "./UpdateItem.less";

const UpdateItem = ({ id, body, created, onDelete, isUserAuthenticated }) => (
  <ListItem>
    <ListItemText
      primary={moment(created).format("MMMM D, YYYY")}
      secondary={body}
    />
    {isUserAuthenticated && (
      <ListItemSecondaryAction
        onClick={() => {
          onDelete(id);
        }}
      >
        <IconButton aria-label="Delete">
          <MoreVertIcon />
        </IconButton>
      </ListItemSecondaryAction>
    )}
  </ListItem>
);

export default UpdateItem;
