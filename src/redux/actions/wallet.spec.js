import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import storeMock from "../store.mock";
import { EXCHANGE_CURRENCY } from "./wallets";
import { exchangeCurrency } from "./wallets";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore(storeMock);

describe("errors_actions", () => {
  beforeEach(() => {
    store.clearActions();
  });

  test("exchangeCurrency dispatches the correct action and payload", () => {
    const wallets = [
      { id: "wallet-id-0", name: "GBP", amount: 189, symbol: "£" },
      { id: "wallet-id-1", name: "EUR", amount: 97.42, symbol: "€" },
      { id: "wallet-id-2", name: "USD", amount: 1000, symbol: "$" }
    ];
    const walletNameFrom = "GBP";
    const walletNameTo = "EUR";
    const valueToConvert = 11;
    const rate = 1.1292034599;
    const expectedActions = [
      {
        type: EXCHANGE_CURRENCY,
        data: {
          wallets
        }
      }
    ];

    store.dispatch(
      exchangeCurrency(
        wallets,
        walletNameFrom,
        walletNameTo,
        valueToConvert,
        rate
      )
    );
    expect(store.getActions()).toEqual(expectedActions);
  });
});
