import React, { useId, useState } from "react";
import Button from "../Button";

import styles from "./passwordInput.module.css";
import cn from "classnames";

const PasswordInput = () => {
  const idPassword = useId();
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleValid = () => {
    if (regex.test(password)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    setShowMessage(true);
  };

  const hideMessage = () => {
    setShowMessage(false);
  };

  const toggleShow = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <label htmlFor={idPassword}>Password: </label>
      <div className={styles.inputIcon}>
        <input
          className={isValid && password ? styles.success : styles.error}
          type={showPassword ? "text" : "password"}
          name="password"
          id={idPassword}
          required
          value={password}
          onChange={handlePassword}
          onMouseLeave={handleValid}
          onFocus={hideMessage}
        />
        <span className={styles.icon}>
          <Button
            iconStyle
            icon={showPassword ? "eyeClosed" : "eye"}
            onClick={toggleShow}
          ></Button>
        </span>
      </div>

      {showMessage && (
        <div
          className={cn(
            styles.message,
            isValid ? styles.success : styles.error
          )}
        >
          {isValid ? (
            <span>Password is strong</span>
          ) : (
            <span>
              Password must contain minimum 8 characters, at least one letter
              and one number
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
