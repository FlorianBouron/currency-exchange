import React from "React";
import { shallow } from "enzyme";
import CurrentRate from ".";

describe("CurrentRate component", () => {
  const component = shallow(<CurrentRate rateFrom="1zl" rateTo="0,231€" />);
  it("has working component", () => {
    expect(component).toBeDefined();
  });
  it("expects component to never be changed", () => {
    expect(component).toMatchSnapshot();
  });
});
