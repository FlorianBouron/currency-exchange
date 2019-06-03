export const selectors = {
  getRates: state => state.rates.rates,
  getRateByName: (state, name) =>
    state.rates.rates ? state.rates.rates[name] : null,
  getBase: state => state.rates.base,
  getError: state => state.rates.error
};
