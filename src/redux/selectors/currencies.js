export const selectors = {
  getCurrencies: state => state.currencies,
  getCurrencyFrom: state => state.currencies.currencyFrom,
  getCurrencyTo: state => state.currencies.currencyTo,
  getInputValueByIndex: (state, indexCurrency) =>
    [Object.keys(state.currencies)[indexCurrency]][0]
      ? state.currencies[[Object.keys(state.currencies)[indexCurrency]][0]]
          .inputValue
      : ""
};
