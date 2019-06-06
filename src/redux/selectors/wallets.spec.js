import store from "../store.mock";
import { getWallets, getWalletByName } from "./wallets";

test("selector getWallets return the expected result", () => {
  expect(getWallets(store)).toBe(store.wallets.data);
});

test("selector getWalletByName return the expected result", () => {
  const name = "USD";
  expect(getWalletByName(store, name)).toBe(
    store.wallets.data.filter(wallet => wallet.name === name)[0]
  );
});
