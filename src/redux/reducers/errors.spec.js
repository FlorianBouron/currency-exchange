import reducer from "./errors";
import { SET_ERROR_BALANCE_FROM } from "../actions/errors";

describe("Errors reducer", () => {
  const initialState = {
    errorBalanceFrom: ""
  };

  it("Initial state when state undefined", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("State when an error is occuring from balance from", () => {
    const errorMessage = "Some Error";
    expect(
      reducer(undefined, {
        type: SET_ERROR_BALANCE_FROM,
        data: {
          error: errorMessage
        }
      })
    ).toEqual({
      ...initialState,
      errorBalanceFrom: errorMessage
    });
  });
});
