import React from "react";
import { Link } from "react-router-dom";

import Button from "../Button";

import styles from "./header.module.css";
import logo from "./logo.png";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.div}>
        <Link to="/">
          <img src={logo} alt="logo" className={styles.img}></img>
        </Link>
        <h1>What to cook?</h1>
      </div>

      <div className={styles.div}>
        <Link to="/log-in">
          <Button large>Log In</Button>
        </Link>
        <Link to="/sign-up">
          <Button large>Sign Up</Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
