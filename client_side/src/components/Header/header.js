import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { userSuccessLoadSelector } from "../../redux/selectors";

import Button from "../Button";

import styles from "./header.module.css";
import logo from "./logo.png";

const Header = ({ logedIn }) => {
  return (
    <div className={styles.container}>
      <div className={styles.div}>
        <Link to="/">
          <img src={logo} alt="logo" className={styles.img}></img>
        </Link>
        <h1>What to cook?</h1>
      </div>

      <div className={styles.div}>
        {logedIn ? (
          <Link to="/me">
            <div className={styles.iconChef}>
              <Button iconStyle icon="chef" />
            </div>
          </Link>
        ) : (
          <Link to="/login">
            <Button large>Log In</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default connect(
  createStructuredSelector({
    logedIn: userSuccessLoadSelector,
  })
)(Header);
