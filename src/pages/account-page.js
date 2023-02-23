import React, { useState } from "react";

import Button from "../components/Button";
import Login from "../components/Login";
import Signup from "../components/Signup";

import styles from "./page.module.css";
import cn from "classnames";

const AccountPage = () => {
  const [rightActive, setRightActive] = useState(false);

  const handleClick = () => {
    setRightActive(!rightActive);
  };

  return (
    <div className={styles.container}>
      <div
        className={cn(
          styles.containerAccount,
          rightActive && styles.rightPanelActive
        )}
      >
        <div className={cn(styles.containerForm, styles.formSignUp)}>
          <Signup />
        </div>
        <div className={cn(styles.containerForm, styles.formLogIn)}>
          <Login />
        </div>

        <div className={styles.containerOverlay}>
          <div className={styles.overlay}>
            <div className={cn(styles.overlayPanel, styles.overlayLeft)}>
              <Button large onClick={handleClick}>
                Log In
              </Button>
            </div>
            <div className={cn(styles.overlayPanel, styles.overlayRight)}>
              <Button large onClick={handleClick}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
