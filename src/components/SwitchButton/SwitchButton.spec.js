import React from "React";
import { shallow } from "enzyme";
import SwitchButton from ".";

describe("SwitchButton component", () => {
  const component = shallow(<SwitchButton onClick={() => {}} />);
  it("has working component", () => {
    expect(component).toBeDefined();
  });
  it("expects component to never be changed", () => {
    expect(component).toMatchSnapshot();
  });
});
