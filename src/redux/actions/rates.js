import axios from "axios";
import config from "../../config";

export const FETCH_RATES = "rates/FETCH_RATES";
export const FETCH_RATES_ERROR = "rates/FETCH_RATES_ERROR";

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
