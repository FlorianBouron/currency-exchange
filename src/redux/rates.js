import axios from "axios";
import config from "../config";

const FETCH_RATES = "rates/FETCH_RATES";

const initialState = {};

export const selectors = {
  getRates: state => state.rates.rates,
  getRateByName: (state, name) =>
    state.rates.rates ? state.rates.rates[name] : null,
  getBase: state => state.rates.base
};

export const fetchRates = () => {
  const { openexchangerates, currencies } = config;
  const { urlApi, ratesEndPoint, key } = openexchangerates;
  const base = "USD";
  const symbols = currencies.join("%2C");
  const request = axios.get(
    `${urlApi}/${ratesEndPoint}?app_id=${key}&base=${base}&symbols=${symbols}`
  );

  return dispatch => {
    request
      .then(({ data }) => {
        dispatch({
          type: FETCH_RATES,
          data
        });
      })
      .catch(error => {
        console.error(`Something wrong during fetching the rates`);
      });
  };
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_RATES: {
      const { data } = action;
      const { base, rates } = data;
      return Object.assign({}, state, { base, rates });
    }
    default:
      return state;
  }
}