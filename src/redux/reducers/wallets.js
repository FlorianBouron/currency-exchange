import {
  GBP_NAME,
  EUR_NAME,
  USD_NAME,
  GBP_SYMBOL,
  EUR_SYMBOL,
  USD_SYMBOL
} from "../../constants/currencies";
import { SET_AMOUNT, EXCHANGE_CURRENCY } from "../actions/wallets";

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

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_AMOUNT: {
      const { data } = action;
      const { walletId, amount } = data;
      const walletToUpdate = state.data.filter(
        wallet => wallet.id === walletId
      )[0];
      walletToUpdate.amount = amount;
      const dataToUpdate = [...data, [walletToUpdate]];
      return { ...state, data: dataToUpdate };
    }
    case EXCHANGE_CURRENCY: {
      const { data } = action;
      const { wallets } = data;
      return { ...state, data: wallets };
    }
    default:
      return state;
  }
}
