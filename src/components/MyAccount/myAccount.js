import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {
  userNameSelector,
  emailSelector,
  tokenSelector,
  userSuccessLoadSelector,
} from "../../redux/selectors";
import { userLoad } from "../../redux/actions";

import Button from "../Button";

import styles from "./myAccount.module.css";

const MyAccount = ({ username, email, token, userLoad, userLoadSuccess }) => {
  if (!token) return <Navigate to="/login" />;

  if (token) {
    userLoad(token);
  }

  if (!userLoadSuccess) {
    localStorage.removeItem("TOKEN");
    return <Navigate to="/login" />;
  }

  const handleLogOut = () => {
    localStorage.removeItem("TOKEN");
    window.location.reload();
  };

  return (
    <div className={styles.containerAccount}>
      <h2>Hello, {username}</h2>
      <h3>Your email: {email}</h3>
      <Button onClick={handleLogOut} large>
        Log Out
      </Button>
    </div>
  );
};

export default connect(
  createStructuredSelector({
    username: userNameSelector,
    email: emailSelector,
    token: tokenSelector,
    userLoadSuccess: userSuccessLoadSelector,
  }),
  (dispatch) => ({
    userLoad: (token) => dispatch(userLoad(token)),
  })
)(MyAccount);
