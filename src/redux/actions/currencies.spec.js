import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import storeMock from "../store.mock";
import {
  SET_CURRENCIES,
  SET_CURRENCY_FROM,
  SET_CURRENCY_TO,
  SET_INPUT_VALUE
} from "./currencies";
import {
  setInputValue,
  setCurrencies,
  setCurrencyFrom,
  setCurrencyTo
} from "./currencies";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore(storeMock);

describe("currencies_actions", () => {
  beforeEach(() => {
    store.clearActions();
  });

  test("setInputValue dispatches the correct action and payload", () => {
    const indexCurrency = 0;
    const inputValue = 1;
    const rate = 1.1292034599;
    const expectedActions = [
      {
        type: SET_INPUT_VALUE,
        data: {
          indexCurrency,
          inputValue,
          rate
        }
      }
    ];

    store.dispatch(setInputValue(indexCurrency, inputValue, rate));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test("setCurrencies dispatches the correct action and payload", () => {
    const currencyFrom = { name: "USD", symbol: "$" };
    const currencyTo = { name: "EUR", symbol: "€" };
    const expectedActions = [
      {
        type: SET_CURRENCIES,
        data: {
          currencyFrom,
          currencyTo
        }
      }
    ];

    store.dispatch(setCurrencies(currencyFrom, currencyTo));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test("setCurrencyFrom dispatches the correct action and payload", () => {
    const name = "USD";
    const symbol = "$";
    const expectedActions = [
      {
        type: SET_CURRENCY_FROM,
        data: {
          name,
          symbol
        }
      }
    ];

    store.dispatch(setCurrencyFrom(name, symbol));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test("setCurrencyTo dispatches the correct action and payload", () => {
    const name = "USD";
    const symbol = "$";
    const expectedActions = [
      {
        type: SET_CURRENCY_TO,
        data: {
          name,
          symbol
        }
      }
    ];

    store.dispatch(setCurrencyTo(name, symbol));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
