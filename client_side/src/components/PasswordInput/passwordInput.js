import React, { useId, useState } from "react";
import Button from "../Button";

import styles from "./passwordInput.module.css";

const initialState = {
  password: "",
  showMessage: false,
  showPassword: false,
};

const PasswordInput = ({ isValid, setIsValid, label }) => {
  const idPassword = useId();
  const [state, setState] = useState(initialState);
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const handlePassword = (e) => {
    setState({ ...state, password: e.target.value });
  };

  const handleValid = () => {
    if (!state.password) return;
    if (regex.test(state.password)) {
      setIsValid((prevState) => ({ ...prevState, password: true }));
    } else {
      setIsValid((prevState) => ({ ...prevState, password: false }));
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
      <label htmlFor={idPassword}>{label} </label>
      <div className={styles.inputIcon}>
        <input
          className={
            state.showMessage ? (isValid ? styles.success : styles.error) : null
          }
          type={state.showPassword ? "text" : "password"}
          name="password"
          id={idPassword}
          value={state.password}
          onChange={handlePassword}
          onBlur={handleValid}
          onMouseOut={handleValid}
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
          <span className={isValid ? styles.success : styles.error}>
            {isValid
              ? "Password is strong"
              : "Password must contain min 8 characters, at least one letter and one number"}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default PasswordInput;
