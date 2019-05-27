import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CurrentRate from "../../components/CurrentRate";
import CurrencyContainer from "../CurrencyContainer";
import styles from "./App.module.scss";

const App = () => {
  const wallets = [
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
  ];
  return (
    <div className={styles["app-container"]}>
      <Paper className={styles["app-paper"]}>
        <Typography variant="h5" component="h3" className={styles["app-title"]}>
          Exchange
        </Typography>
        <CurrencyContainer wallets={wallets} currentCurrency="GBP" />
        <CurrencyContainer wallets={wallets} currentCurrency="EUR" isReadOnly />
        <CurrentRate rateFrom="1zl" rateTo="0,231€" />
        <Button variant="contained" color="secondary">
          Exchange
        </Button>
      </Paper>
    </div>
  );
};

export default App;
