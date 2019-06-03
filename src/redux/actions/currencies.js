export const SET_CURRENCIES = "currencies/SET_CURRENCIES";
export const SET_CURRENCY_FROM = "currencies/SET_CURRENCY_FROM";
export const SET_CURRENCY_TO = "currencies/SET_CURRENCY_TO";
export const SET_INPUT_VALUE = "currencies/SET_INPUT_VALUE";

export const setInputValue = (indexCurrency, inputValue, rate) => {
  return dispatch => {
    dispatch({
      type: SET_INPUT_VALUE,
      data: {
        indexCurrency,
        inputValue,
        rate
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
