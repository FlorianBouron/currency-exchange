import currency from "currency.js";

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
  wallets[indexWalletTo].amount = currency(wallets[indexWalletTo].amount).add(
    amountTo
  );
  wallets[indexWalletFrom].amount = currency(
    wallets[indexWalletFrom].amount
  ).subtract(valueToConvert);
  return dispatch => {
    dispatch({
      type: EXCHANGE_CURRENCY,
      data: {
        wallets
      }
    });
  };
};
