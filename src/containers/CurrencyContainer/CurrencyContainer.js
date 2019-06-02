import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { selectors } from "../../redux/wallets";
import {
  setErrorBalanceFrom,
  setErrorBalanceTo,
  selectors as selectorsErrors
} from "../../redux/errors";
import {
  setInputValue,
  selectors as selectorsCurrencies
} from "../../redux/currencies";
import { selectors as selectorsRates } from "../../redux/rates";
import CurrencySelector from "../../components/CurrencySelector";
import { errorLimit } from "../../constants/text";
import styles from "./CurrencyContainer.module.scss";

class CurrencyContainer extends React.PureComponent {
  setErrorMesages = message => {
    const { isReadOnly } = this.props;
    if (isReadOnly) {
      const { setErrorBalanceTo } = this.props;
      setErrorBalanceTo(message);
    } else {
      const { setErrorBalanceFrom } = this.props;
      setErrorBalanceFrom(message);
    }
  };

  handleChange = ({ target }) => {
    const { amount, isReadOnly, setInputValue, rate } = this.props;
    const { value } = target;
    let inputValue = value;

    if (Math.abs(value) > amount) {
      this.setErrorMesages(errorLimit);
    } else {
      this.setErrorMesages("");
    }
    setInputValue(Number(isReadOnly), inputValue, rate);
  };

  handleAllowedCharacters = event => {
    /*
      Table of Values:
      46: .
      48: 0
      57: 9
    */
    if ((event.charCode < 48 || event.charCode > 57) && event.charCode !== 46) {
      event.preventDefault();
    }

    //Prevent to have two dots
    if (event.target.value.indexOf(".") !== -1 && event.charCode === 46) {
      event.preventDefault();
    }

    //Prevent to have more than two digits after the dot
    const stringAfterDot = event.target.value.split(".")[1];
    if (stringAfterDot && stringAfterDot.length >= 2) {
      event.preventDefault();
    }
  };

  render() {
    const {
      wallets,
      className,
      currentCurrency,
      onChangeCurrency,
      error,
      inputValue,
      symbol,
      amount
    } = this.props;

    // Check if input > balance
    if (Math.abs(inputValue) > amount) {
      this.setErrorMesages(errorLimit);
    }

    return (
      <div className={[styles["currency-container"], className].join(" ")}>
        <div className={styles["currency__input-selector"]}>
          <CurrencySelector
            currentCurrency={currentCurrency}
            wallets={wallets}
            onChange={onChangeCurrency}
          />
          <TextField
            value={inputValue}
            onChange={this.handleChange}
            onKeyPress={this.handleAllowedCharacters}
            type="text"
            placeholder="0"
            className={styles["currency__text-field"]}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
        </div>
        <div className={styles["currency__info"]}>
          <div className={error ? [styles["currency__balance-error"]] : null}>
            Balance: {`${symbol}${amount}`}
          </div>
          {error ? <span>{error}</span> : null}
        </div>
      </div>
    );
  }
}

CurrencyContainer.propTypes = {
  wallets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired
    })
  ),
  currentCurrency: PropTypes.string.isRequired,
  isReadOnly: PropTypes.bool,
  className: PropTypes.string,
  onChangeCurrency: PropTypes.func.isRequired
};

CurrencyContainer.defaultProps = {
  wallets: [],
  isReadOnly: false,
  className: null
};

export default connect(
  (state, props) => ({
    amount: selectors.getWalletByName(state, props.currentCurrency).amount,
    symbol: selectors.getWalletByName(state, props.currentCurrency).symbol,
    error: selectorsErrors.getErrors(state)[
      props.isReadOnly ? "errorBalanceTo" : "errorBalanceFrom"
    ],
    inputValue: selectorsCurrencies.getInputValueByIndex(
      state,
      props.isReadOnly ? 1 : 0
    ),
    rate: selectorsRates.getRateByName(state, props.currencyRate)
  }),
  { setErrorBalanceFrom, setErrorBalanceTo, setInputValue }
)(CurrencyContainer);
