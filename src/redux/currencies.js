const SET_CURRENCIES = "currencies/SET_CURRENCIES";
const SET_CURRENCY_FROM = "currencies/SET_CURRENCY_FROM";
const SET_CURRENCY_TO = "currencies/SET_CURRENCY_TO";
const SET_INPUT_VALUE = "currencies/SET_INPUT_VALUE";

const initialState = {
  currencyFrom: {
    name: "GBP",
    symbol: "£",
    inputValue: ""
  },

  currencyTo: {
    name: "EUR",
    symbol: "€",
    inputValue: ""
  }
};

export const selectors = {
  getCurrencies: state => state.currencies,
  getCurrencyFrom: state => state.currencies.currencyFrom,
  getCurrencyTo: state => state.currencies.currencyTo,
  getInputValueByIndex: (state, indexCurrency) => {
    return [Object.keys(state.currencies)[indexCurrency]][0]
      ? state.currencies[[Object.keys(state.currencies)[indexCurrency]][0]]
          .inputValue
      : "";
  }
};

export const setInputValue = (indexCurrency, inputValue) => {
  return dispatch => {
    dispatch({
      type: SET_INPUT_VALUE,
      data: {
        indexCurrency,
        inputValue
      }
    });
  };
};

export const setCurrencies = (currencyFrom, currencyTo) => {
  return dispatch => {
    dispatch({
      type: SET_CURRENCIES,
      data: {
        currencyFrom,
        currencyTo
      }
    });
  };
};

export const setCurrencyFrom = (name, symbol) => {
  return dispatch => {
    dispatch({
      type: SET_CURRENCY_FROM,
      data: {
        name,
        symbol
      }
    });
  };
};

export const setCurrencyTo = (name, symbol) => {
  return dispatch => {
    dispatch({
      type: SET_CURRENCY_TO,
      data: {
        name,
        symbol
      }
    });
  };
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_CURRENCIES: {
      const { data } = action;
      const { currencyFrom, currencyTo } = data;
      return Object.assign({}, state, { currencyFrom, currencyTo });
    }
    case SET_CURRENCY_FROM: {
      const { data } = action;
      const { name, symbol } = data;
      return Object.assign({}, state, {
        currencyFrom: { name, symbol, inputValue: "" }
      });
    }
    case SET_CURRENCY_TO: {
      const { data } = action;
      const { name, symbol } = data;
      return Object.assign({}, state, {
        currencyTo: { name, symbol, inputValue: "" }
      });
    }
    case SET_INPUT_VALUE: {
      const { data } = action;
      const { indexCurrency, inputValue } = data;
      const currencyKeyName = [Object.keys(state)[indexCurrency]][0];
      const currencyObject = state[currencyKeyName];
      currencyObject.inputValue = inputValue;
      return Object.assign({}, state, { [currencyKeyName]: currencyObject });
    }
    default:
      return state;
  }
}
