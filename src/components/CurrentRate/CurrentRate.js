import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TrendingUp from "@material-ui/icons/TrendingUp";
import classNames from "classnames";
import { selectors } from "../../redux/selectors/rates";
import styles from "./CurrentRate.module.scss";

const CurrentRate = ({ currencyFrom, currencyTo, className, rate }) => (
  <div
    className={classNames(className, {
      [styles["current-rate-container"]]: true
    })}
  >
    <TrendingUp className={styles["current-rate__icon"]} />
    {`1${currencyFrom.symbol} = ${rate}${currencyTo.symbol}`}
  </div>
);

CurrentRate.propTypes = {
  currencyFrom: PropTypes.shape({
    name: PropTypes.string,
    symbol: PropTypes.string
  }),
  currencyTo: PropTypes.shape({
    name: PropTypes.string,
    symbol: PropTypes.string
  }),
  className: PropTypes.string
};

CurrentRate.defaultProps = {
  className: null
};

export default connect((state, props) => ({
  rate: selectors.getRateByName(state, props.currencyTo.name)
}))(CurrentRate);
