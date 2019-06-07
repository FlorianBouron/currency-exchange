import React from "React";
import { shallow, mount } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import NumberFormat from "react-number-format";
import CurrencyContainer from ".";

describe("CurrencyContainer component", () => {
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
    store,
    wallets: [
      { id: "wallet-id-0", name: "GBP", amount: 200, symbol: "£" },
      { id: "wallet-id-1", name: "EUR", amount: 85, symbol: "€" },
      { id: "wallet-id-2", name: "USD", amount: 1000, symbol: "$" }
    ],
    currentCurrency: "EUR",
    className: "App_app__currency-container-read-only__2LQBE",
    onChangeCurrency: jest.fn(),
    currencyRate: "EUR"
  };

  it("has working component", () => {
    const component = shallow(<CurrencyContainer {...basicProps} />);
    expect(component).toBeDefined();
  });

  it("expects component to never be changed", () => {
    const component = shallow(<CurrencyContainer {...basicProps} />);
    expect(component).toMatchSnapshot();
  });

  it("expects component to never be changed with isReadOnly", () => {
    const customReduxState = {
      ...reduxState,
      errors: { errorBalanceFrom: "Some error..." }
    };
    const customStore = mockStore(customReduxState);
    const customProps = {
      ...basicProps,
      store: customStore,
      isReadOnly: true
    };
    const component = shallow(<CurrencyContainer {...customProps} />);
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  it("expects to call setErrorBalanceFrom", () => {
    const customReduxState = {
      ...reduxState,
      currencies: {
        currencyFrom: { name: "GBP", symbol: "£", inputValue: "33" },
        currencyTo: { name: "EUR", symbol: "€", inputValue: "33" }
      },
      wallets: {
        data: [
          { id: "wallet-id-0", name: "GBP", amount: 1, symbol: "£" },
          { id: "wallet-id-1", name: "EUR", amount: 1, symbol: "€" },
          { id: "wallet-id-2", name: "USD", amount: 1000, symbol: "$" }
        ]
      }
    };
    const store = mockStore(customReduxState);

    let setErrorBalanceFromCalled = false;
    const customProps = {
      ...basicProps,
      store,
      setErrorBalanceFrom: () => {
        setErrorBalanceFromCalled = true;
      }
    };
    const component = mount(<CurrencyContainer {...customProps} />);
    expect(component).toBeDefined();
    setTimeout(() => {
      expect(setErrorBalanceFromCalled).toBe(true);
    });
  });

  it("expects to call setErrorBalanceFrom and prevent not allowed character", () => {
    let preventDefaultHasBeenCalled = false;
    const customEvent = {
      charCode: 23,
      preventDefault: () => (preventDefaultHasBeenCalled = true)
    };
    const component = mount(<CurrencyContainer {...basicProps} />);
    component
      .find(NumberFormat)
      .first()
      .simulate("keypress", customEvent);
    expect(preventDefaultHasBeenCalled).toBe(true);
  });

  it("expects to call setErrorBalanceFrom and prevent two dots", () => {
    let preventDefaultHasBeenCalled = false;
    const customEvent = {
      charCode: 46,
      target: {
        value: "200.22"
      },
      preventDefault: () => (preventDefaultHasBeenCalled = true)
    };
    const component = mount(<CurrencyContainer {...basicProps} />);
    component
      .find(NumberFormat)
      .first()
      .simulate("keypress", customEvent);
    expect(preventDefaultHasBeenCalled).toBe(true);
  });

  it("expects to call handleChange and call setErrorBalanceFrom and add error to redux", () => {
    const customEvent = {
      value: 99999
    };
    const component = mount(<CurrencyContainer {...basicProps} />);
    component
      .find(NumberFormat)
      .first()
      .simulate("change", customEvent);
    expect(component).toBeDefined();
  });

  it("expects to call handleChange and call setErrorBalanceFrom and clear error to redux", () => {
    const customEvent = {
      value: 1
    };
    const component = mount(<CurrencyContainer {...basicProps} />);
    component
      .find(NumberFormat)
      .first()
      .simulate("change", customEvent);
    expect(component).toBeDefined();
  });

  it("expects to call handleChange and call setErrorBalanceFrom and clear error to redux", () => {
    const customEvent = {
      value: 1
    };
    const component = mount(<CurrencyContainer {...basicProps} />);
    component
      .find(NumberFormat)
      .first()
      .prop("onValueChange")(customEvent);
    expect(component).toBeDefined();
  });
});
