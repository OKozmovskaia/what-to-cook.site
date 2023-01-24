import React from "react";
import Button from "../Button";

import styles from "./header.module.css";
import logo from "./logo.png";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.div}>
        <img src={logo} alt="logo" className={styles.img}></img>
        <h1>What to cook?</h1>
      </div>
      <div className={styles.div}>
        <Button large>Log In</Button>
        <Button large>Sign Up</Button>
      </div>
    </div>
  );
};

export default Header;
