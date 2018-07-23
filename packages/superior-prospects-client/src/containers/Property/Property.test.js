import React from "react";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Property from "./Property";

const mockStore = configureStore([thunk]);

describe("Property container", () => {
  it("renders without crashing", () => {
    const initialState = {};
    const initialProps = {
      match: { params: {} },
      selected: { _id: 1234, media: [] },
      getProperty: () => Promise.resolve({})
    };
    const store = mockStore(initialState);

    const output = shallow(<Property store={store} {...initialProps} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
