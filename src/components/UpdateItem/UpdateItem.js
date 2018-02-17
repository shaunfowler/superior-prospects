import React from "react";
import moment from "moment";
import { Button } from "material-ui";
import "./UpdateItem.less";

const UpdateItem = ({ id, body, created, onDelete, isUserAuthenticated }) => (
  <div className="updateItem">
    <div>
      <div>{moment(created).format("MMMM D, YYYY")}</div>
      {isUserAuthenticated && (
        <Button
          color="primary"
          size="small"
          onClick={() => onDelete(id)}
          aria-label="Delete"
        >
          Delete
        </Button>
      )}
    </div>

    <div>{body}</div>
  </div>
);

export default UpdateItem;
