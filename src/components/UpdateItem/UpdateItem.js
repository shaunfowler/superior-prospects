import React from "react";
import "./UpdateItem.css";

const UpdateItem = ({ id, body, created, onDelete, isUserAuthenticated }) => (
  <div className="updateItem">
    {body}
    <br />
    {created.toString()}
    <br />
    {isUserAuthenticated && (
      <button onClick={() => onDelete(id)} className="delete" />
    )}
  </div>
);

export default UpdateItem;
