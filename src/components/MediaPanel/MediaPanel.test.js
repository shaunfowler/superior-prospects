import React from "react";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import MediaPanel from "./";

describe("Properties container", () => {
  const media = [
    { _id: "1234", fileName: "test.png", created: "2018-04-16T12:00:00+00:00" }
  ];

  it("renders when not authenticated", () => {
    const props = {
      media,
      isAuthenticated: false
    };
    const output = shallow(<MediaPanel {...props} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it("renders when authenticated", () => {
    const props = {
      media,
      isAuthenticated: true
    };

    const output = shallow(<MediaPanel {...props} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
