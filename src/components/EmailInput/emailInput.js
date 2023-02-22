import React, { useId, useState } from "react";

import styles from "./emailInput.module.css";
import cn from "classnames";

const EmailInput = () => {
  const idEmail = useId();
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,12})+$/;

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleValid = () => {
    if (regex.test(email)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    setShowMessage(true);
  };

  const hideMessage = () => {
    setShowMessage(false);
  };

  return (
    <div className={styles.container}>
      <label htmlFor={idEmail}>Email: </label>

      <input
        className={isValid && email ? styles.success : styles.error}
        type="email"
        name="email"
        id={idEmail}
        required
        value={email}
        onChange={handleEmail}
        onMouseLeave={handleValid}
        onFocus={hideMessage}
      />

      {showMessage && (
        <div
          className={cn(
            styles.message,
            isValid ? styles.success : styles.error
          )}
        >
          {isValid ? (
            <span>Email is correct</span>
          ) : (
            <span>Please, enter a valid email address</span>
          )}
        </div>
      )}
    </div>
  );
};

export default EmailInput;
