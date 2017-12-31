import React from "react";
import "./UpdateItem.css";

const UpdateItem = ({ id, body, created, onDelete }) => (
  <div className="updateItem">
    {body}
    <br />
    {created.toString()}
    <br />
    <button onClick={() => onDelete(id)} className="delete" />
  </div>
);

export default UpdateItem;
