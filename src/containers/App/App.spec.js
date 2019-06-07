import React from "React";
import { shallow, mount } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import Button from "@material-ui/core/Button";
import SwitchButton from "../../components/SwitchButton";
import App from ".";

describe("App component", () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const reduxState = {
    currencies: {
      currencyFrom: { name: "GBP", symbol: "£", inputValue: "" },
      currencyTo: { name: "EUR", symbol: "€", inputValue: "" }
    },
    wallets: {
      data: [
        { id: "wallet-id-0", name: "GBP", amount: 200, symbol: "£" },
        { id: "wallet-id-1", name: "EUR", amount: 85, symbol: "€" },
        { id: "wallet-id-2", name: "USD", amount: 1000, symbol: "$" }
      ]
    },
    rates: {
      base: "GBP",
      rates: { USD: 1.2721606179, EUR: 1.1292034599, GBP: 1 },
      error: ""
    },
    errors: { errorBalanceFrom: "" }
  };
  const store = mockStore(reduxState);

  const basicProps = {
    store
  };

  it("has working component", () => {
    const component = shallow(<App {...basicProps} />);
    expect(component).toBeDefined();
  });

  it("expects component to never be changed", () => {
    const component = shallow(<App {...basicProps} />);
    expect(component).toMatchSnapshot();
  });

  it("expects to call handleClickSwitch", () => {
    const component = mount(
      <Provider {...basicProps}>
        <App />
      </Provider>
    );
    component
      .find(SwitchButton)
      .first()
      .simulate("click");
    expect(component).toBeDefined();
  });

  it("expects to call handleClickExchange", () => {
    const component = mount(
      <Provider {...basicProps}>
        <App />
      </Provider>
    );
    component
      .find(Button)
      .first()
      .simulate("click");
    expect(component).toBeDefined();
  });
});
