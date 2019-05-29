import axios from "axios";
import config from "../config";

const FETCH_RATES = "rates/FETCH_RATES";
const FETCH_RATES_ERROR = "rates/FETCH_RATES_ERROR";

const initialState = {};

export const selectors = {
  getRates: state => state.rates.rates,
  getRateByName: (state, name) =>
    state.rates.rates ? state.rates.rates[name] : null,
  getBase: state => state.rates.base,
  getError: state => state.rates.error
};

export const fetchRates = base => {
  const { exchangeratesapi, currencies } = config;
  const { urlApi, ratesEndPoint } = exchangeratesapi;
  const symbols = currencies.join("%2C");
  const request = axios.get(
    `${urlApi}/${ratesEndPoint}?base=${base}&symbols=${symbols}`
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
        console.error(error);
        dispatch({
          type: FETCH_RATES_ERROR,
          data: "Something wrong during fetching the rates"
        });
      });
  };
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_RATES: {
      const { data } = action;
      const { base, rates } = data;
      return Object.assign({}, state, { base, rates, error: "" });
    }
    case FETCH_RATES_ERROR: {
      const { data } = action;
      return Object.assign({}, state, { error: data });
    }
    default:
      return state;
  }
}
