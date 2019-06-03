import { combineReducers } from "redux";
import currencies from "./reducers/currencies";
import wallets from "./reducers/wallets";
import rates from "./reducers/rates";
import errors from "./reducers/errors";

export default combineReducers({
  currencies,
  wallets,
  rates,
  errors
});
