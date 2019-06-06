export const getRates = state => state.rates.rates;
export const getRateByName = (state, name) =>
  state.rates.rates ? state.rates.rates[name] : null;
export const getRateBase = state => state.rates.base;
export const getRateError = state => state.rates.error;
