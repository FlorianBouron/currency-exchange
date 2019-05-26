import React from "react";
import PropTypes from "prop-types";
import TrendingUp from "@material-ui/icons/TrendingUp";
import styles from "./CurrentRate.module.scss";

const CurrentRate = ({ rateFrom, rateTo }) => {
  return (
    <div className={styles["current-rate-container"]}>
      <TrendingUp className={styles["current-rate-icon"]} />
      {rateFrom} = {rateTo}
    </div>
  );
};

CurrentRate.propTypes = {
  rateFrom: PropTypes.string.isRequired,
  rateTo: PropTypes.string.isRequired
};

export default CurrentRate;
