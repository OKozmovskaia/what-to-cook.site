import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "./redux/store";

import "./index.css";

// DEV. ONLY
// window.store = store;

store.subscribe(() => {
  localStorage.setItem("TOKEN", store.getState().user.token);
  localStorage.setItem("USER_ID", store.getState().user.id);
  localStorage.setItem("SUCCESS_LOAD_USER", store.getState().user.success);
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
