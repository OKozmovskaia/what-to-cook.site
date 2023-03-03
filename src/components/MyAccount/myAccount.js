import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {
  userNameSelector,
  emailSelector,
  tokenSelector,
} from "../../redux/selectors";

import styles from "./myAccount.module.css";

const MyAccount = ({ username, email, token }) => {
  if (!token) return <Navigate to="/login" />;
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
    token: tokenSelector,
  })
)(MyAccount);
