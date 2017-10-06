import React from "react";

const UpdateItem = ({ id, text, date, onDelete }) => (
  <div>
    {text}
    <br />
    {date.toString()}
    <button onClick={onDelete(id)}>Delete</button>
  </div>
);

export default UpdateItem;
