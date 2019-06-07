import reducer from "./currencies";
import {
  SET_CURRENCIES,
  SET_CURRENCY_FROM,
  SET_CURRENCY_TO,
  SET_INPUT_VALUE
} from "../actions/currencies";
import config from "../../config";

describe("Currencies reducer", () => {
  const { defaultCurrencies } = config;
  const initialState = {
    currencyFrom: {
      name: defaultCurrencies.from.name,
      symbol: defaultCurrencies.from.symbol,
      inputValue: ""
    },

    currencyTo: {
      name: defaultCurrencies.to.name,
      symbol: defaultCurrencies.to.symbol,
      inputValue: ""
    }
  };

  it("Initial state when state undefined", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("State when SET_CURRENCIES is called", () => {
    expect(
      reducer(undefined, {
        type: SET_CURRENCIES,
        data: {
          currencyFrom: { name: "GBP", symbol: "£", inputValue: "0" },
          currencyTo: { name: "EUR", symbol: "€", inputValue: "0" }
        }
      })
    ).toEqual({
      currencyFrom: { name: "GBP", symbol: "£", inputValue: "0" },
      currencyTo: { name: "EUR", symbol: "€", inputValue: "0" }
    });
  });

  it("State when SET_CURRENCY_FROM is called", () => {
    expect(
      reducer(undefined, {
        type: SET_CURRENCY_FROM,
        data: {
          name: "USD",
          symbol: "$"
        }
      })
    ).toEqual({
      currencyFrom: { name: "USD", symbol: "$", inputValue: "" },
      currencyTo: { name: "EUR", symbol: "€", inputValue: "" }
    });

    expect(
      reducer(undefined, {
        type: SET_CURRENCY_FROM,
        data: {
          name: "EUR",
          symbol: "€"
        }
      })
    ).toEqual({
      currencyFrom: { name: "EUR", symbol: "€", inputValue: "" },
      currencyTo: { name: "GBP", symbol: "£", inputValue: "" }
    });
  });

  it("State when SET_CURRENCY_TO is called", () => {
    expect(
      reducer(undefined, {
        type: SET_CURRENCY_TO,
        data: {
          name: "USD",
          symbol: "$"
        }
      })
    ).toEqual({
      currencyFrom: { name: "GBP", symbol: "£", inputValue: "" },
      currencyTo: { name: "USD", symbol: "$", inputValue: "" }
    });

    expect(
      reducer(undefined, {
        type: SET_CURRENCY_TO,
        data: {
          name: "GBP",
          symbol: "£"
        }
      })
    ).toEqual({
      currencyFrom: { name: "EUR", symbol: "€", inputValue: "" },
      currencyTo: { name: "GBP", symbol: "£", inputValue: "" }
    });
  });

  it("State when SET_INPUT_VALUE is called", () => {
    expect(
      reducer(undefined, {
        type: SET_INPUT_VALUE,
        data: { indexCurrency: 1, inputValue: 1.13, rate: 1.1292034599 }
      })
    ).toEqual({
      currencyFrom: { name: "GBP", symbol: "£", inputValue: "1.00" },
      currencyTo: { name: "EUR", symbol: "€", inputValue: 1.13 }
    });

    expect(
      reducer(undefined, {
        type: SET_INPUT_VALUE,
        data: { indexCurrency: 1, inputValue: 0, rate: 1.1292034599 }
      })
    ).toEqual({
      currencyFrom: { name: "GBP", symbol: "£", inputValue: "0" },
      currencyTo: { name: "EUR", symbol: "€", inputValue: "0" }
    });

    expect(
      reducer(undefined, {
        type: SET_INPUT_VALUE,
        data: { indexCurrency: 0, inputValue: 1.13, rate: 1.1292034599 }
      })
    ).toEqual({
      currencyFrom: { name: "GBP", symbol: "£", inputValue: 1.13 },
      currencyTo: { name: "EUR", symbol: "€", inputValue: "1.28" }
    });

    expect(
      reducer(undefined, {
        type: SET_INPUT_VALUE,
        data: { indexCurrency: 0, inputValue: "", rate: 1.1292034599 }
      })
    ).toEqual({
      currencyFrom: { name: "GBP", symbol: "£", inputValue: "0" },
      currencyTo: { name: "EUR", symbol: "€", inputValue: "0" }
    });
  });
});
