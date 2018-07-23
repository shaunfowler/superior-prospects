import React from "react";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Home from "./";

describe("Home container", () => {
  it("renders without crashing", () => {
    const output = shallow(<Home />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
