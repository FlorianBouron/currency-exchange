import { combineReducers } from "redux";
import currencies from "./currencies";
import wallets from "./wallets";
import rates from "./rates";

export default combineReducers({
  currencies,
  wallets,
  rates
});
