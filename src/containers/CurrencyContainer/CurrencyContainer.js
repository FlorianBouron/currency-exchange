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
import CurrencySelector from "../../components/CurrencySelector";
import styles from "./CurrencyContainer.module.scss";

class CurrencyContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    const { isReadOnly } = props;
    this.signInput = isReadOnly ? "+" : "-";
  }

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
    const { amount, isReadOnly, setInputValue } = this.props;
    const { value } = target;
    let inputValue = value;

    if (value === this.signInput) {
      inputValue = "";
    }

    if (Math.abs(value) > amount) {
      const error = "Exceed your balance";
      this.setErrorMesages(error);
    } else {
      this.setErrorMesages("");
    }
    setInputValue(Number(isReadOnly), inputValue);
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
    let displayInputValue = inputValue;
    if (
      this.signInput === "+" &&
      inputValue.toString().indexOf("+") === -1 &&
      inputValue.toString().length
    ) {
      displayInputValue = `${this.signInput}${inputValue}`;
    } else if (this.signInput === "-" && inputValue > 0) {
      displayInputValue = `${this.signInput}${inputValue}`;
    }

    return (
      <div className={[styles["currency-container"], className].join(" ")}>
        <div className={styles["currency-input-selector"]}>
          <CurrencySelector
            currentCurrency={currentCurrency}
            wallets={wallets}
            onChange={onChangeCurrency}
          />
          <TextField
            value={displayInputValue}
            onChange={this.handleChange}
            onKeyPress={this.handleAllowedCharacters}
            type="text"
            placeholder="0"
            className={styles["currency-text-field"]}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
        </div>
        <div className={styles["currency-info"]}>
          <div className={error ? [styles["currency-balance-error"]] : null}>
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
      Number(props.isReadOnly)
    )
  }),
  { setErrorBalanceFrom, setErrorBalanceTo, setInputValue }
)(CurrencyContainer);
