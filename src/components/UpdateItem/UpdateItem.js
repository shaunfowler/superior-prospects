import React from "react";

const UpdateItem = ({ id, body, created, onDelete }) => (
  <div>
    {body}
    <br />
    {created.toString()}
    <br />
    <button onClick={() => onDelete(id)}>Delete</button>
  </div>
);

export default UpdateItem;
