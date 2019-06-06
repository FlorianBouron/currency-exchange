export default {
  currencies: {
    currencyFrom: { name: "GBP", symbol: "£", inputValue: "1" },
    currencyTo: { name: "EUR", symbol: "€", inputValue: "" }
  },
  wallets: {
    data: [
      { id: "wallet-id-0", name: "GBP", amount: 200, symbol: "£" },
      { id: "wallet-id-1", name: "EUR", amount: 85, symbol: "€" },
      { id: "wallet-id-2", name: "USD", amount: 1000, symbol: "$" }
    ]
  },
  rates: {
    base: "GBP",
    rates: { USD: 1.2721606179, EUR: 1.1292034599, GBP: 1 },
    error: ""
  }
};
