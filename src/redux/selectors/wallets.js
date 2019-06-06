export const getWallets = state => state.wallets.data;
export const getWalletByName = (state, name) =>
  state.wallets.data.filter(wallet => wallet.name === name)[0];
