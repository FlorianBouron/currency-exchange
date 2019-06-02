import React from "react";
import PropTypes from "prop-types";
import Fab from "@material-ui/core/Fab";
import CompareArrows from "@material-ui/icons/CompareArrows";
import styles from "./SwitchButton.module.scss";

const SwitchButton = ({ className, onClick }) => {
  return (
    <Fab
      aria-label="Switch"
      className={[styles["switch-button-container"], className].join(" ")}
      size="small"
      onClick={onClick}
    >
      <CompareArrows className={styles["switch-button__icon"]} />
    </Fab>
  );
};

SwitchButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

SwitchButton.defaultProps = {
  className: null
};

export default SwitchButton;
