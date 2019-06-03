export const SET_AMOUNT = "wallets/SET_AMOUNT";
export const EXCHANGE_CURRENCY = "wallets/EXCHANGE_CURRENCY";

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
