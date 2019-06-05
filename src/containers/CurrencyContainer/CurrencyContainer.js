import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";
import { selectors } from "../../redux/selectors/wallets";
import {
  setErrorBalanceFrom,
  setErrorBalanceTo
} from "../../redux/actions/errors";
import { selectors as selectorsErrors } from "../../redux/selectors/errors";
import { setInputValue } from "../../redux/actions/currencies";
import { selectors as selectorsCurrencies } from "../../redux/selectors/currencies";
import { selectors as selectorsRates } from "../../redux/selectors/rates";
import CurrencySelector from "../../components/CurrencySelector";
import { errorLimit } from "../../constants/text";
import styles from "./CurrencyContainer.module.scss";

class CurrencyContainer extends React.PureComponent {
  setErrorMessages = message => {
    const { isReadOnly } = this.props;
    if (isReadOnly) {
      const { setErrorBalanceTo } = this.props;
      setErrorBalanceTo(message);
    } else {
      const { setErrorBalanceFrom } = this.props;
      setErrorBalanceFrom(message);
    }
  };

  handleChange = ({ value }) => {
    const { amount, isReadOnly, setInputValue, rate } = this.props;

    if (value > amount) {
      this.setErrorMessages(errorLimit);
    } else {
      this.setErrorMessages("");
    }
    setInputValue(Number(isReadOnly), value, rate);
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
    if (inputValue > amount) {
      this.setErrorMessages(errorLimit);
    }

    return (
      <div className={[styles["currency-container"], className].join(" ")}>
        <div className={styles["currency__input-selector"]}>
          <CurrencySelector
            currentCurrency={currentCurrency}
            wallets={wallets}
            onChange={onChangeCurrency}
          />
          <NumberFormat
            value={inputValue}
            onValueChange={this.handleChange}
            onKeyPress={this.handleAllowedCharacters}
            thousandSeparator
            className={styles["currency__text-field"]}
            prefix={"$"}
            placeholder="0"
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
