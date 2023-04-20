import React, { useId, useState } from "react";

import styles from "./userNameInput.module.css";

const initialState = {
  username: "",
  showMessage: false,
};

const UserNameInput = ({ isValid, setIsValid }) => {
  const idUsername = useId();
  const [state, setState] = useState(initialState);
  const regex = /^[\w-_.]{2,25}$/;

  const handleName = (e) => {
    setState((prevState) => ({ ...prevState, username: e.target.value }));
  };

  const handleValid = () => {
    if (!state.username || state.username === "") {
      setIsValid((prevState) => ({ ...prevState, username: false }));
      return;
    }
    if (regex.test(state.username)) {
      setIsValid((prevState) => ({ ...prevState, username: true }));
    } else {
      setIsValid((prevState) => ({ ...prevState, username: false }));
    }
    setState((prevState) => ({ ...prevState, showMessage: true }));
  };

  const hideMessage = () => {
    setState((prevState) => ({ ...prevState, showMessage: false }));
  };

  return (
    <div className={styles.container}>
      <label htmlFor={idUsername}>Login: </label>

      <input
        className={
          state.showMessage ? (isValid ? styles.success : styles.error) : null
        }
        type="text"
        name="displayName"
        id={idUsername}
        value={state.username}
        onChange={handleName}
        onMouseOut={handleValid}
        onBlur={handleValid}
        onFocus={hideMessage}
      />

      <div className={styles.message}>
        {state.showMessage ? (
          <span className={isValid ? styles.success : styles.error}>
            {isValid
              ? `Welcome, ${state.username}`
              : "Login must be 1 word between 2 and 25 characters long"}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default UserNameInput;
