import React from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {
  setCurrencies,
  setCurrencyFrom,
  setCurrencyTo
} from "../../redux/actions/currencies";
import { selectors as selectorsCurrencies } from "../../redux/selectors/currencies";
import { fetchRates, selectors as selectorsRates } from "../../redux/rates";
import { exchangeCurrency } from "../../redux/actions/wallets";
import { selectors as selectorsWallets } from "../../redux/selectors/wallets";
import { selectors as selectorsErrors } from "../../redux/errors";
import CurrentRate from "../../components/CurrentRate";
import SwitchButton from "../../components/SwitchButton";
import CurrencyContainer from "../CurrencyContainer";
import config from "../../config";
import styles from "./App.module.scss";

class App extends React.Component {
  currencyToFetch = config.defaultCurrencies.from.name;

  componentDidMount() {
    const { fetchRates } = this.props;
    const { exchangeratesapi } = config;
    const { frequencyFetching } = exchangeratesapi;

    fetchRates(this.currencyToFetch);
    this.interval = setInterval(() => {
      fetchRates(this.currencyToFetch);
    }, frequencyFetching);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleClickExchange = () => {
    const { wallets, currencies, rates, exchangeCurrency } = this.props;
    const { currencyFrom, currencyTo } = currencies;
    exchangeCurrency(
      wallets,
      currencyFrom.name,
      currencyTo.name,
      Math.abs(currencies.currencyFrom.inputValue),
      rates[currencyTo.name]
    );
  };

  handleClickSwitch = () => {
    const { setCurrencies, currencies, fetchRates } = this.props;
    const { currencyFrom, currencyTo } = currencies;
    this.currencyToFetch = currencyTo.name;
    setCurrencies(currencyTo, currencyFrom);
    fetchRates(this.currencyToFetch);
  };

  render() {
    const {
      wallets,
      currencies,
      setCurrencyFrom,
      setCurrencyTo,
      isNoBalanceErrors,
      errorRate
    } = this.props;
    const { currencyFrom, currencyTo } = currencies;
    return (
      <div className={styles["app-container"]}>
        <Paper className={styles["app__paper"]}>
          <Typography
            variant="h5"
            component="h3"
            className={styles["app__title"]}
          >
            Exchange
          </Typography>
          <CurrencyContainer
            wallets={wallets}
            currentCurrency={currencyFrom.name}
            currencyRate={currencyTo.name}
            onChangeCurrency={setCurrencyFrom}
          />
          <SwitchButton
            className={styles["app__switch-button"]}
            onClick={this.handleClickSwitch}
          />
          <CurrentRate
            currencyFrom={currencyFrom}
            currencyTo={currencyTo}
            className={styles["app__current-rate"]}
          />
          <CurrencyContainer
            wallets={wallets}
            currentCurrency={currencyTo.name}
            currencyRate={currencyTo.name}
            onChangeCurrency={setCurrencyTo}
            isReadOnly
            className={styles["app__currency-container-read-only"]}
          />
          <div className={styles["app__footer"]}>
            <Button
              variant="contained"
              color="secondary"
              disabled={isNoBalanceErrors || !!errorRate}
              onClick={this.handleClickExchange}
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
    isNoBalanceErrors:
      !!selectorsErrors.getErrors(state).errorBalanceFrom ||
      !!selectorsErrors.getErrors(state).errorBalanceTo,
    rates: selectorsRates.getRates(state),
    errorRate: selectorsRates.getError(state)
  }),
  {
    fetchRates,
    setCurrencies,
    setCurrencyFrom,
    setCurrencyTo,
    exchangeCurrency
  }
)(App);
