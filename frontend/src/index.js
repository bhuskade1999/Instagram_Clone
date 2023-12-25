import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import { Provider as AlertProvider, positions, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "bootstrap/dist/css/bootstrap.min.css";

const options = {
  position: positions.TOP_CENTER,
  timeout: 4000,
  transition: transitions.SCALE,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </Provider>
  </React.StrictMode>
);
