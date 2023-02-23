import React, { useId, useState } from "react";
import Button from "../Button";

import styles from "./passwordInput.module.css";

const initialState = {
  password: "",
  isValid: false,
  showMessage: false,
  showPassword: false,
};

const PasswordInput = () => {
  const idPassword = useId();
  const [state, setState] = useState(initialState);
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const handlePassword = (e) => {
    setState({ ...state, password: e.target.value });
  };

  const handleValid = () => {
    if (!state.password) return;
    if (regex.test(state.password)) {
      setState((prevState) => ({ ...prevState, isValid: true }));
    } else {
      setState((prevState) => ({ ...prevState, isValid: false }));
    }
    setState((prevState) => ({ ...prevState, showMessage: true }));
  };

  const hideMessage = () => {
    setState((prevState) => ({ ...prevState, showMessage: false }));
  };

  const toggleShow = () => {
    setState((prevState) => ({
      ...prevState,
      showPassword: !state.showPassword,
    }));
  };

  return (
    <div className={styles.container}>
      <label htmlFor={idPassword}>Password: </label>
      <div className={styles.inputIcon}>
        <input
          className={
            state.showMessage
              ? state.isValid
                ? styles.success
                : styles.error
              : null
          }
          type={state.showPassword ? "text" : "password"}
          name="password"
          id={idPassword}
          required
          value={state.password}
          onChange={handlePassword}
          onMouseLeave={handleValid}
          onFocus={hideMessage}
        />
        <span className={styles.icon}>
          <Button
            iconStyle
            icon={state.showPassword ? "eyeClosed" : "eye"}
            onClick={toggleShow}
          ></Button>
        </span>
      </div>

      <div className={styles.message}>
        {state.showMessage ? (
          <span className={state.isValid ? styles.success : styles.error}>
            {state.isValid
              ? "Password is strong"
              : "Password must contain min 8 characters, at least one letter andone number"}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default PasswordInput;
