import config from "../../config";
import {
  SET_CURRENCIES,
  SET_CURRENCY_FROM,
  SET_CURRENCY_TO,
  SET_INPUT_VALUE
} from "../actions/currencies";

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

function reverseCurrencies(state) {
  const { currencyFrom, currencyTo } = state;
  return {
    ...state,
    currencyFrom: {
      name: currencyTo.name,
      symbol: currencyTo.symbol,
      inputValue: currencyTo.inputValue
    },
    currencyTo: {
      name: currencyFrom.name,
      symbol: currencyFrom.symbol,
      inputValue: currencyFrom.inputValue
    }
  };
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_CURRENCIES: {
      const { data } = action;
      const { currencyFrom, currencyTo } = data;
      return {
        ...state,
        currencyFrom,
        currencyTo
      };
    }
    case SET_CURRENCY_FROM: {
      const { data } = action;
      const { name, symbol } = data;
      if (name === state.currencyTo.name) {
        return reverseCurrencies(state);
      }
      return {
        ...state,
        currencyFrom: {
          name,
          symbol,
          inputValue: ""
        }
      };
    }
    case SET_CURRENCY_TO: {
      const { data } = action;
      const { name, symbol } = data;
      if (name === state.currencyFrom.name) {
        return reverseCurrencies(state);
      }
      return {
        ...state,
        currencyTo: {
          name,
          symbol,
          inputValue: ""
        }
      };
    }
    case SET_INPUT_VALUE: {
      const { data } = action;
      const { indexCurrency, inputValue, rate } = data;
      const currencyKeyName = [Object.keys(state)[indexCurrency]][0];
      const currencyObject = state[currencyKeyName];
      const connectedKeyName = [
        Object.keys(state)[indexCurrency === 1 ? 0 : 1]
      ][0];
      const connectedObject = state[connectedKeyName];
      if (Number(inputValue) === 0) {
        return {
          ...state,
          [currencyKeyName]: { ...currencyObject, inputValue: 0 },
          [connectedKeyName]: { ...connectedObject, inputValue: 0 }
        };
      } else if (inputValue !== "") {
        if (indexCurrency === 0) {
          return {
            ...state,
            [currencyKeyName]: { ...currencyObject, inputValue },
            [connectedKeyName]: {
              ...connectedObject,
              inputValue: Number(Math.abs(inputValue * rate).toFixed(2))
            }
          };
        } else {
          return {
            ...state,
            [currencyKeyName]: { ...currencyObject, inputValue },
            [connectedKeyName]: {
              ...connectedObject,
              inputValue: Number(Math.abs(inputValue / rate).toFixed(2))
            }
          };
        }
      } else {
        return {
          ...state,
          [currencyKeyName]: { ...currencyObject, inputValue: "" },
          [connectedKeyName]: { ...connectedObject, inputValue: "" }
        };
      }
    }
    default:
      return state;
  }
}
