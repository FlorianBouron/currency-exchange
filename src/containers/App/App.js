import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styles from "./App.module.scss";

const App = () => {
  return (
    <div className={styles["app-container"]}>
      <Paper className={styles["app-paper"]}>
        <Typography variant="h5" component="h3" className={styles["app-title"]}>
          Exchange
        </Typography>
        <Button variant="contained" color="secondary">
          Exchange
        </Button>
      </Paper>
    </div>
  );
};

export default App;
