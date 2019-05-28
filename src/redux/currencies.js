const SET_CURRENCIES = "currencies/SET_CURRENCIES";
const SET_CURRENCY_FROM = "currencies/SET_CURRENCY_FROM";
const SET_CURRENCY_TO = "currencies/SET_CURRENCY_TO";

const initialState = {
  currencyFrom: "GBP",
  currencyTo: "EUR"
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

export const setCurrencyFrom = currencyFrom => {
  return dispatch => {
    dispatch({
      type: SET_CURRENCY_FROM,
      data: {
        currencyFrom
      }
    });
  };
};

export const setCurrencyTo = currencyTo => {
  return dispatch => {
    dispatch({
      type: SET_CURRENCY_TO,
      data: {
        currencyTo
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
      const { currencyFrom } = data;
      return Object.assign({}, state, { currencyFrom });
    }
    case SET_CURRENCY_TO: {
      const { data } = action;
      const { currencyTo } = data;
      return Object.assign({}, state, { currencyTo });
    }
    default:
      return state;
  }
}
