import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { userNameSelector, emailSelector } from "../../redux/selectors";

import styles from "./myAccount.module.css";

const MyAccount = ({ username, email }) => {
  return (
    <div className={styles.containerAccount}>
      <h2>Hello, {username}</h2>
      <h3>Your email: {email}</h3>
    </div>
  );
};

export default connect(
  createStructuredSelector({
    username: userNameSelector,
    email: emailSelector,
  })
)(MyAccount);
