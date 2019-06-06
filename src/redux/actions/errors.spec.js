import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import storeMock from "../store.mock";
import { SET_ERROR_BALANCE_FROM } from "./errors";
import { setErrorBalanceFrom } from "./errors";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore(storeMock);

describe("errors_actions", () => {
  beforeEach(() => {
    store.clearActions();
  });

  test("setErrorBalanceFrom dispatches the correct action and payload", () => {
    const error = "Some error";
    const expectedActions = [
      {
        type: SET_ERROR_BALANCE_FROM,
        data: {
          error
        }
      }
    ];

    store.dispatch(setErrorBalanceFrom(error));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
