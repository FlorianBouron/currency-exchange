const defaultConfig = {
  devToolsDisabled: false
};

const env = process.env.REACT_APP_ENV || "development";
const specificConfig = require(`./${env}.js`).default;

export default Object.assign(defaultConfig, specificConfig);
