import { mergeDeep } from "../utils/helpers";

const defaultConfig = {
  devToolsDisabled: false,
  openexchangerates: {
    urlApi: "https://openexchangerates.org/api",
    ratesEndPoint: "latest.json",
    frequencyFetching: 10000
  },
  currencies: ["GBP", "EUR", "USD"]
};

const env = process.env.REACT_APP_ENV || "development";
const specificConfig = require(`./${env}.js`).default;

export default mergeDeep(defaultConfig, specificConfig);
