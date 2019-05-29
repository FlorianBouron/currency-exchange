import React from "React";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import CurrentRate from ".";

describe("CurrentRate component", () => {
  const mockStore = configureStore();
  const initialState = {
    base: "USD",
    rates: {
      EUR: 0.897841,
      GBP: 0.791715,
      USD: 1
    }
  };
  const store = mockStore(initialState);
  const component = shallow(
    <CurrentRate
      store={store}
      currencyFrom={{
        name: "GBP",
        symbol: "£"
      }}
      currencyTo={{
        name: "EUR",
        symbol: "€"
      }}
    />
  );
  it("has working component", () => {
    expect(component).toBeDefined();
  });
  it("expects component to never be changed", () => {
    expect(component).toMatchSnapshot();
  });
});
