import React from "react";
import PropTypes from "prop-types";
import Fab from "@material-ui/core/Fab";
import CompareArrows from "@material-ui/icons/CompareArrows";
import classNames from "classnames";
import styles from "./SwitchButton.module.scss";

const SwitchButton = ({ className, onClick }) => {
  return (
    <Fab
      aria-label="Switch"
      className={classNames(className, {
        [styles["switch-button-container"]]: true
      })}
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
