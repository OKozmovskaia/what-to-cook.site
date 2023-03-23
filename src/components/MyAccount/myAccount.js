import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {
  userNameSelector,
  emailSelector,
  tokenSelector,
  userSuccessLoadSelector,
  idSelector,
} from "../../redux/selectors";
import { userLoad } from "../../redux/actions/user";

import Button from "../Button";

import styles from "./myAccount.module.css";

const MyAccount = ({
  username,
  email,
  token,
  id,
  userLoad,
  userLoadSuccess,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      userLoad(token);
    }
  }, [token, userLoad]);

  if (!token) return <Navigate to="/login" />;

  if (!userLoadSuccess) {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("USER_ID");
    return <Navigate to="/login" />;
  }

  const handleLogOut = () => {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("USER_ID");
    window.location.reload();
  };

  return (
    <div className={styles.containerAccount}>
      <h2>Hello, {username}</h2>
      <h3>Your email: {email}</h3>
      <Button onClick={handleLogOut} large>
        Log Out
      </Button>
      <Button onClick={() => navigate(`/password_reset/${token}/${id}`)} large>
        Change Password
      </Button>
    </div>
  );
};

export default connect(
  createStructuredSelector({
    username: userNameSelector,
    email: emailSelector,
    token: tokenSelector,
    id: idSelector,
    userLoadSuccess: userSuccessLoadSelector,
  }),
  (dispatch) => ({
    userLoad: (token) => dispatch(userLoad(token)),
  })
)(MyAccount);
