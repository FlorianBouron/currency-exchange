import store from "../store.mock";
import { getRates, getRateByName, getRateBase, getRateError } from "./rates";

test("selector getRates return the expected result", () => {
  expect(getRates(store)).toBe(store.rates.rates);
});

test("selector getRateByName return the expected result", () => {
  const currency = "USD";
  expect(getRateByName(store, currency)).toBe(
    store.rates.rates[currency].toFixed(3)
  );
});

test("selector getRateBase return the expected result", () => {
  expect(getRateBase(store)).toBe(store.rates.base);
});

test("selector getRateError return the expected result", () => {
  expect(getRateError(store)).toBe(store.rates.error);
});
