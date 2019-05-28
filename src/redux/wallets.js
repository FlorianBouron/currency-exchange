const SET_AMOUNT = "wallets/SET_AMOUNT";

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
    default:
      return state;
  }
}
