import React from "react";
import ReactDOM from "react-dom";
import Property from "./Property";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Property />, div);
});
