import React from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {
  setCurrencies,
  setCurrencyFrom,
  setCurrencyTo,
  selectors as selectorsCurrencies
} from "../../redux/currencies";
import { fetchRates } from "../../redux/rates";
import { selectors as selectorsWallets } from "../../redux/wallets";
import { selectors as selectorsErrors } from "../../redux/errors";
import CurrentRate from "../../components/CurrentRate";
import SwitchButton from "../../components/SwitchButton";
import CurrencyContainer from "../CurrencyContainer";
import config from "../../config";
import styles from "./App.module.scss";

class App extends React.Component {
  componentDidMount() {
    const { fetchRates } = this.props;
    const { openexchangerates } = config;
    const { frequencyFetching } = openexchangerates;

    this.interval = setInterval(() => {
      fetchRates();
    }, frequencyFetching);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      wallets,
      currencies,
      setCurrencies,
      setCurrencyFrom,
      setCurrencyTo,
      isExchangeAllowed
    } = this.props;
    const { currencyFrom, currencyTo } = currencies;
    return (
      <div className={styles["app-container"]}>
        <Paper className={styles["app-paper"]}>
          <Typography
            variant="h5"
            component="h3"
            className={styles["app-title"]}
          >
            Exchange
          </Typography>
          <CurrencyContainer
            wallets={wallets}
            currentCurrency={currencyFrom.name}
            onChangeCurrency={setCurrencyFrom}
          />
          <SwitchButton
            className={styles["app-switch-button"]}
            onClick={() => setCurrencies(currencyTo, currencyFrom)}
          />
          <CurrentRate
            currencyFrom={currencyFrom}
            currencyTo={currencyTo}
            className={styles["app-current-rate"]}
          />
          <CurrencyContainer
            wallets={wallets}
            currentCurrency={currencyTo.name}
            onChangeCurrency={setCurrencyTo}
            isReadOnly
            className={styles["app-currency-container-read-only"]}
          />
          <div className={styles["app-footer"]}>
            <Button
              variant="contained"
              color="secondary"
              disabled={isExchangeAllowed}
            >
              Exchange
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

export default connect(
  state => ({
    wallets: selectorsWallets.getWallets(state),
    currencies: selectorsCurrencies.getCurrencies(state),
    isExchangeAllowed:
      !!selectorsErrors.getErrors(state).errorBalanceFrom ||
      !!selectorsErrors.getErrors(state).errorBalanceTo
  }),
  { fetchRates, setCurrencies, setCurrencyFrom, setCurrencyTo }
)(App);
