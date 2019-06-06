import store from "../store.mock";
import {
  getCurrencies,
  getCurrencyFrom,
  getCurrencyTo,
  getCurrencyInputValueByIndex
} from "./currencies";

test("selector getCurrencies return the expected result", () => {
  expect(getCurrencies(store)).toBe(store.currencies);
});

test("selector getCurrencyFrom return the expected result", () => {
  expect(getCurrencyFrom(store)).toBe(store.currencies.currencyFrom);
});

test("selector getCurrencyTo return the expected result", () => {
  expect(getCurrencyTo(store)).toBe(store.currencies.currencyTo);
});

test("selector getCurrencyInputValueByIndex return the expected result", () => {
  expect(getCurrencyInputValueByIndex(store, 0)).toBe(
    store.currencies.currencyFrom.inputValue
  );
  expect(getCurrencyInputValueByIndex(store, 1)).toBe(
    store.currencies.currencyTo.inputValue
  );
  expect(getCurrencyInputValueByIndex(store, 2)).toBe("");
});
