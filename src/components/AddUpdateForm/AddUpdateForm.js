import React from "react";

const AddUpdateForm = ({ onAdd }) => (
  <div>
    <h2>Add new update</h2>
    <input type="text" />
    <button onClick={() => onAdd({ id: 999 })}>Add</button>
  </div>
);

export default AddUpdateForm;
