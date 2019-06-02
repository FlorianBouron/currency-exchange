import { mergeDeep } from "../utils/helpers";
import {
  GBP_NAME,
  EUR_NAME,
  USD_NAME,
  GBP_SYMBOL,
  EUR_SYMBOL
} from "../constants/currencies";

const defaultConfig = {
  devToolsDisabled: false,
  exchangeratesapi: {
    urlApi: "https://api.exchangeratesapi.io",
    ratesEndPoint: "latest",
    frequencyFetching: 10000
  },
  currencies: [GBP_NAME, EUR_NAME, USD_NAME],
  defaultCurrencies: {
    from: {
      name: GBP_NAME,
      symbol: GBP_SYMBOL
    },
    to: {
      name: EUR_NAME,
      symbol: EUR_SYMBOL
    }
  }
};

const env = process.env.REACT_APP_ENV || "development";
const specificConfig = require(`./${env}.js`).default;

export default mergeDeep(defaultConfig, specificConfig);
