const SET_AMOUNT = "wallets/SET_AMOUNT";
const EXCHANGE_CURRENCY = "wallets/EXCHANGE_CURRENCY";

const initialState = {
  data: [
    {
      id: "wallet-id-0",
      name: "GBP",
      amount: 200,
      symbol: "£"
    },
    {
      id: "wallet-id-1",
      name: "EUR",
      amount: 85,
      symbol: "€"
    },
    {
      id: "wallet-id-2",
      name: "USD",
      amount: 1000,
      symbol: "$"
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
