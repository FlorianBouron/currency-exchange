import reducer from "./rates";
import { FETCH_RATES, FETCH_RATES_ERROR } from "../actions/rates";

describe("Rates reducer", () => {
  const initialState = {};

  it("Initial state when state undefined", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("State when FETCH is successful", () => {
    expect(
      reducer(undefined, {
        type: FETCH_RATES,
        data: {
          base: "GBP",
          rates: { USD: 1.2721606179, EUR: 1.1292034599, GBP: 1 },
          date: "2019-06-06"
        }
      })
    ).toEqual({
      ...initialState,
      base: "GBP",
      rates: { USD: 1.2721606179, EUR: 1.1292034599, GBP: 1 },
      error: ""
    });
  });

  it("State when FETCH is NOT successful", () => {
    expect(
      reducer(undefined, {
        type: FETCH_RATES_ERROR,
        data: "Something wrong during fetching the rates"
      })
    ).toEqual({
      ...initialState,
      error: "Something wrong during fetching the rates"
    });
  });
});
