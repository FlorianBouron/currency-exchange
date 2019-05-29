import { mergeDeep } from "../utils/helpers";

const defaultConfig = {
  devToolsDisabled: false,
  exchangeratesapi: {
    urlApi: "https://api.exchangeratesapi.io",
    ratesEndPoint: "latest",
    frequencyFetching: 10000
  },
  currencies: ["GBP", "EUR", "USD"]
};

const env = process.env.REACT_APP_ENV || "development";
const specificConfig = require(`./${env}.js`).default;

export default mergeDeep(defaultConfig, specificConfig);
