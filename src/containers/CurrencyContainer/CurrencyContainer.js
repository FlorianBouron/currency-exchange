import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import CurrencySelector from "../../components/CurrencySelector";
import styles from "./CurrencyContainer.module.scss";

class CurrencyContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    const { wallets, currentCurrency, isReadOnly } = props;

    let currentWallet = {
      amount: 0,
      symbol: "",
      name: ""
    };
    if (wallets.length && currentCurrency) {
      currentWallet = wallets.filter(
        wallet => wallet.name === currentCurrency
      )[0];
    }
    const { amount, symbol, name } = currentWallet;

    this.state = {
      amount,
      inputValue: amount,
      symbol,
      currencyName: name,
      error: ""
    };

    this.signInput = isReadOnly ? "+" : "-";
  }

  handleChange = ({ target }) => {
    const { amount } = this.state;
    const { value } = target;
    const state = {
      inputValue: value
    };

    if (value === this.signInput) {
      state.inputValue = "";
    }

    if (Math.abs(value) > amount) {
      state.error = "Exceed your balance";
    } else {
      state.error = "";
    }

    this.setState(state);
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
  };

  render() {
    const { wallets, className } = this.props;
    const { amount, inputValue, symbol, currencyName, error } = this.state;
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
            currentCurrency={currencyName}
            wallets={wallets}
            onChange={() => {}}
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
  className: PropTypes.string
};

CurrencyContainer.defaultProps = {
  wallets: [],
  isReadOnly: false,
  className: null
};

export default CurrencyContainer;
