import React from "react";

const UpdateItem = ({ id, text, date }) => (
  <div>
    {text}
    <br />
    {date.toString()}
  </div>
);

export default UpdateItem;
