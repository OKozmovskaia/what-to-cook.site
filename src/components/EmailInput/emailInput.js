import React, { useId, useState } from "react";

import styles from "./emailInput.module.css";

const initialState = {
  email: "",
  isValid: false,
  showMessage: false,
};

const EmailInput = () => {
  const idEmail = useId();
  const [state, setState] = useState(initialState);
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,12})+$/;

  const handleEmail = (e) => {
    setState((prevState) => ({ ...prevState, email: e.target.value }));
  };

  const handleValid = () => {
    if (!state.email) return;
    if (regex.test(state.email)) {
      setState((prevState) => ({ ...prevState, isValid: true }));
    } else {
      setState((prevState) => ({ ...prevState, isValid: false }));
    }
    setState((prevState) => ({ ...prevState, showMessage: true }));
  };

  const hideMessage = () => {
    setState((prevState) => ({ ...prevState, showMessage: false }));
  };

  return (
    <div className={styles.container}>
      <label htmlFor={idEmail}>Email: </label>

      <input
        className={
          state.showMessage
            ? state.isValid
              ? styles.success
              : styles.error
            : null
        }
        type="email"
        name="email"
        id={idEmail}
        required
        value={state.email}
        onChange={handleEmail}
        onMouseLeave={handleValid}
        onFocus={hideMessage}
      />

      <div className={styles.message}>
        {state.showMessage ? (
          <span className={state.isValid ? styles.success : styles.error}>
            {state.isValid
              ? "Email is correct"
              : "Please, enter a valid email address"}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default EmailInput;
