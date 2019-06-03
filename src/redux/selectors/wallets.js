export const selectors = {
  getWallets: state => state.wallets.data,
  getWalletByName: (state, name) =>
    state.wallets.data.filter(wallet => wallet.name === name)[0]
};
