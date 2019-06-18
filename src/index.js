import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./redux/store";
import App from "./containers/App";
import "./index.scss";

const state = window.__initialState__ || undefined;
const store = configureStore(state);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
