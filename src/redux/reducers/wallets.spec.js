import reducer from "./wallets";
import {
  GBP_NAME,
  EUR_NAME,
  USD_NAME,
  GBP_SYMBOL,
  EUR_SYMBOL,
  USD_SYMBOL
} from "../../constants/currencies";
import { EXCHANGE_CURRENCY } from "../actions/wallets";

describe("Wallet reducer", () => {
  const initialState = {
    data: [
      {
        id: "wallet-id-0",
        name: GBP_NAME,
        amount: 200,
        symbol: GBP_SYMBOL
      },
      {
        id: "wallet-id-1",
        name: EUR_NAME,
        amount: 85,
        symbol: EUR_SYMBOL
      },
      {
        id: "wallet-id-2",
        name: USD_NAME,
        amount: 1000,
        symbol: USD_SYMBOL
      }
    ]
  };

  it("Initial state when state undefined", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("State when an we exchange the currency", () => {
    expect(
      reducer(undefined, {
        type: EXCHANGE_CURRENCY,
        data: {
          wallets: [
            { id: "wallet-id-0", name: "GBP", amount: 210.63, symbol: "£" },
            { id: "wallet-id-1", name: "EUR", amount: 73, symbol: "€" },
            { id: "wallet-id-2", name: "USD", amount: 1000, symbol: "$" }
          ]
        }
      })
    ).toEqual({
      data: [
        { id: "wallet-id-0", name: "GBP", amount: 210.63, symbol: "£" },
        { id: "wallet-id-1", name: "EUR", amount: 73, symbol: "€" },
        { id: "wallet-id-2", name: "USD", amount: 1000, symbol: "$" }
      ]
    });
  });
});
