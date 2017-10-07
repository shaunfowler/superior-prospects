import React from "react";

const UpdateItem = ({ id, text, date, onDelete }) => (
  <div>
    {text}
    <br />
    {date.toString()}
    <br />
    <button onClick={() => onDelete(id)}>Delete</button>
  </div>
);

export default UpdateItem;
