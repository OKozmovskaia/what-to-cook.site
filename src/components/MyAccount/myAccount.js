import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {
  userNameSelector,
  emailSelector,
  tokenSelector,
  userErrorSelector,
} from "../../redux/selectors";
import { userLoad } from "../../redux/actions";

import styles from "./myAccount.module.css";

const MyAccount = ({ username, email, token, userLoad, message }) => {
  useEffect(() => {
    if (token) userLoad(token);
  }, [userLoad, token]);

  if (!token) return <Navigate to="/login" />;
  return (
    <div className={styles.containerAccount}>
      <h2>Hello, {username}</h2>
      <h3>Your email: {email}</h3>
      <h3>Message: {message}</h3>
    </div>
  );
};

export default connect(
  createStructuredSelector({
    username: userNameSelector,
    email: emailSelector,
    token: tokenSelector,
    message: userErrorSelector,
  }),
  (dispatch) => ({
    userLoad: (token) => dispatch(userLoad(token)),
  })
)(MyAccount);
