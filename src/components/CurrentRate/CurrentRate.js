import React from "react";
import PropTypes from "prop-types";
import TrendingUp from "@material-ui/icons/TrendingUp";
import styles from "./CurrentRate.module.scss";

const CurrentRate = ({ rateFrom, rateTo, className }) => {
  return (
    <div className={[styles["current-rate-container"], className].join(" ")}>
      <TrendingUp className={styles["current-rate-icon"]} />
      {rateFrom} = {rateTo}
    </div>
  );
};

CurrentRate.propTypes = {
  rateFrom: PropTypes.string.isRequired,
  rateTo: PropTypes.string.isRequired,
  className: PropTypes.string
};

CurrentRate.defaultProps = {
  className: null
};

export default CurrentRate;
