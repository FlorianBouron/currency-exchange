export const getCurrencies = state => state.currencies;
export const getCurrencyFrom = state => state.currencies.currencyFrom;
export const getCurrencyTo = state => state.currencies.currencyTo;
export const getCurrencyInputValueByIndex = (state, indexCurrency) =>
  [Object.keys(state.currencies)[indexCurrency]][0]
    ? state.currencies[[Object.keys(state.currencies)[indexCurrency]][0]]
        .inputValue
    : "";
