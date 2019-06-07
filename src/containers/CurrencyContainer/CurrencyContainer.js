import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";
import classNames from "classnames";
import { getWalletByName } from "../../redux/selectors/wallets";
import { setErrorBalanceFrom } from "../../redux/actions/errors";
import { getErrors } from "../../redux/selectors/errors";
import { setInputValue } from "../../redux/actions/currencies";
import { getCurrencyInputValueByIndex } from "../../redux/selectors/currencies";
import { fetchRates } from "../../redux/actions/rates";
import { getRateByName } from "../../redux/selectors/rates";
import CurrencySelector from "../../components/CurrencySelector";
import { errorLimit } from "../../constants/text";
import styles from "./CurrencyContainer.module.scss";

class CurrencyContainer extends React.PureComponent {
  handleError = ({ floatValue }) => {
    const { isReadOnly, error } = this.props;
    if (!isReadOnly) {
      const { amount, setErrorBalanceFrom } = this.props;
      if (floatValue > amount) {
        setErrorBalanceFrom(errorLimit);
      } else if (error.length) {
        setErrorBalanceFrom("");
      }
    }
  };
  handleChange = ({ target }) => {
    const { isReadOnly, setInputValue, rate } = this.props;
    const value = Number(target.value.replace(",", ""));
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
      amount,
      isReadOnly,
      setErrorBalanceFrom,
      fetchRates
    } = this.props;

    // Check if input > balance
    if (!isReadOnly && inputValue > amount) {
      setErrorBalanceFrom(errorLimit);
    }

    return (
      <div
        className={classNames(className, {
          [styles["currency-container"]]: true
        })}
      >
        <div className={styles["currency__input-selector"]}>
          <CurrencySelector
            currentCurrency={currentCurrency}
            wallets={wallets}
            onChange={onChangeCurrency}
            fetchRates={fetchRates}
            isReadOnly={isReadOnly}
          />
          <NumberFormat
            value={inputValue}
            onChange={this.handleChange}
            onValueChange={this.handleError}
            onKeyPress={this.handleAllowedCharacters}
            thousandSeparator
            className={styles["currency__text-field"]}
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
  onChangeCurrency: PropTypes.func.isRequired,
  currencyRate: PropTypes.string.isRequired
};

CurrencyContainer.defaultProps = {
  wallets: [],
  isReadOnly: false,
  className: null
};

export default connect(
  (state, props) => ({
    amount: getWalletByName(state, props.currentCurrency).amount,
    symbol: getWalletByName(state, props.currentCurrency).symbol,
    error: props.isReadOnly ? null : getErrors(state).errorBalanceFrom,
    inputValue: getCurrencyInputValueByIndex(state, props.isReadOnly ? 1 : 0),
    rate: getRateByName(state, props.currencyRate)
  }),
  { setErrorBalanceFrom, setInputValue, fetchRates }
)(CurrencyContainer);
