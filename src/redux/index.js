import { combineReducers } from "redux";
import currencies from "./reducers/currencies";
import wallets from "./wallets";
import rates from "./rates";
import errors from "./errors";

export default combineReducers({
  currencies,
  wallets,
  rates,
  errors
});
