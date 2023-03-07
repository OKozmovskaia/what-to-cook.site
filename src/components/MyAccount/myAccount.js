import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {
  userNameSelector,
  emailSelector,
  tokenSelector,
} from "../../redux/selectors";
import { userLoad } from "../../redux/actions";

import Button from "../Button";

import styles from "./myAccount.module.css";

const MyAccount = ({ username, email, token, userLoad }) => {
  useEffect(() => {
    if (token) userLoad(token);
  }, [userLoad, token]);

  if (!token) return <Navigate to="/login" />;

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
  }),
  (dispatch) => ({
    userLoad: (token) => dispatch(userLoad(token)),
  })
)(MyAccount);
