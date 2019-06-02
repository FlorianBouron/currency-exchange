import {
  GBP_NAME,
  EUR_NAME,
  USD_NAME,
  GBP_SYMBOL,
  EUR_SYMBOL,
  USD_SYMBOL
} from "../constants/currencies";

const SET_AMOUNT = "wallets/SET_AMOUNT";
const EXCHANGE_CURRENCY = "wallets/EXCHANGE_CURRENCY";

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

export const selectors = {
  getWallets: state => state.wallets.data,
  getWalletByName: (state, name) =>
    state.wallets.data.filter(wallet => wallet.name === name)[0]
};

export const exchangeCurrency = (
  wallets,
  walletNameFrom,
  walletNameTo,
  valueToConvert,
  rate
) => {
  const amountTo = valueToConvert * rate;
  const indexWalletTo = wallets.findIndex(
    wallet => wallet.name === walletNameTo
  );
  const indexWalletFrom = wallets.findIndex(
    wallet => wallet.name === walletNameFrom
  );
  wallets[indexWalletTo].amount = (
    wallets[indexWalletTo].amount + amountTo
  ).toFixed(2);
  wallets[indexWalletFrom].amount = (
    wallets[indexWalletFrom].amount + valueToConvert
  ).toFixed(2);
  return dispatch => {
    dispatch({
      type: EXCHANGE_CURRENCY,
      data: {
        wallets
      }
    });
  };
};

export const setAmount = (walletId, amount) => {
  return dispatch => {
    dispatch({
      type: SET_AMOUNT,
      data: {
        walletId,
        amount
      }
    });
  };
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
      return Object.assign({}, state, { data: dataToUpdate });
    }
    case EXCHANGE_CURRENCY: {
      const { data } = action;
      const { wallets } = data;
      return Object.assign({}, state, { data: wallets });
    }
    default:
      return state;
  }
}
