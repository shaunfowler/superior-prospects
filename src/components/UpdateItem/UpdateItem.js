import React from "react";
import moment from "moment";
import "./UpdateItem.less";

const UpdateItem = ({ id, body, created, onDelete, isUserAuthenticated }) => (
  <div className="updateItem">
    <div className="is-size-6 has-text-weight-bold">
      {moment(created).format("MMMM D, YYYY")}
      {isUserAuthenticated && (
        <button onClick={() => onDelete(id)} className="delete" />
      )}
    </div>
    <div className="has-text-grey description">{body}</div>
  </div>
);

export default UpdateItem;
