const SET_CURRENCIES = "currencies/SET_CURRENCIES";
const SET_CURRENCY_FROM = "currencies/SET_CURRENCY_FROM";
const SET_CURRENCY_TO = "currencies/SET_CURRENCY_TO";

const initialState = {
  currencyFrom: {
    name: "GBP",
    symbol: "£"
  },

  currencyTo: {
    name: "EUR",
    symbol: "€"
  }
};

export const selectors = {
  getCurrencies: state => state.currencies,
  getCurrencyFrom: state => state.currencies.currencyFrom,
  getCurrencyTo: state => state.currencies.currencyTo
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
      return Object.assign({}, state, { currencyFrom: { name, symbol } });
    }
    case SET_CURRENCY_TO: {
      const { data } = action;
      const { name, symbol } = data;
      return Object.assign({}, state, { currencyTo: { name, symbol } });
    }
    default:
      return state;
  }
}
