import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import styles from "./CurrencySelector.module.scss";

class CurrencySelector extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleClickButton = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClickItem = name => {
    const { onChange } = this.props;
    this.setState(
      {
        anchorEl: null
      },
      onChange(name)
    );
  };

  handleCloseMenu = () => {
    this.setState({
      anchorEl: null
    });
  };

  render() {
    const { currentCurrency } = this.props;
    const { anchorEl } = this.state;
    const { wallets } = this.props;
    return (
      <Fragment>
        <Button
          size="large"
          aria-owns={anchorEl ? "currency-selector" : undefined}
          aria-haspopup="true"
          onClick={this.handleClickButton}
          classes={{
            label: styles["currency-selector-button"]
          }}
        >
          {currentCurrency}
          <KeyboardArrowDown />
        </Button>
        <Menu
          id="currency-selector"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleCloseMenu}
        >
          {wallets.map(wallet => {
            const { name, id } = wallet;
            return (
              <MenuItem onClick={() => this.handleClickItem(name)} key={id}>
                {name}
              </MenuItem>
            );
          })}
        </Menu>
      </Fragment>
    );
  }
}

CurrencySelector.propTypes = {
  currentCurrency: PropTypes.string.isRequired,
  wallets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired
    })
  ),
  onChange: PropTypes.func.isRequired
};

CurrencySelector.defaultProps = {
  wallets: []
};

export default CurrencySelector;
