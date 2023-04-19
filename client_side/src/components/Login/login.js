import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { userLogin, userOAuth, forgotPassword } from "../../redux/actions/user";
import {
  userLoadingSelector,
  userOAuthRedirectSelector,
  userSuccessLoadSelector,
} from "../../redux/selectors";

import Button from "../Button";
import EmailInput from "../EmailInput";
import Loader from "../Loader";
import PasswordInput from "../PasswordInput";
import SocialMediaSet from "../SocialMediaSet";

import styles from "./login.module.css";

const Login = ({
  userLogin,
  userLoadSuccess,
  loading,
  redirectTo,
  userOAuth,
  forgotPassword,
}) => {
  const [isValid, setIsValid] = useState({
    email: false,
    password: false,
  });
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    userLogin(Object.fromEntries(data));
  };

  const handleOAuth = (provider) => {
    userOAuth(provider);
  };

  const handleSubmitReset = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    forgotPassword(Object.fromEntries(data));
  };

  if (loading) return <Loader />;

  if (redirectTo) window.location.href = redirectTo;

  if (userLoadSuccess) {
    return <Navigate to="/me" />;
  }

  return (
    <div className={styles.containerAccount}>
      <div className={styles.containerForm}>
        <div className={styles.formLogin}>
          <h3>Log in to your Chef account</h3>
          <SocialMediaSet handleOAuth={handleOAuth} />
          <form
            className={styles.form}
            noValidate
            onSubmit={handleSubmitLogin}
            method="POST"
          >
            <EmailInput
              isValid={isValid.email}
              setIsValid={setIsValid}
              submit={handleSubmitLogin}
            />
            <PasswordInput
              label="Password:"
              isValid={isValid.password}
              setIsValid={setIsValid}
            />
            <Button block={!(isValid.email && isValid.password)} submit small>
              Log In
            </Button>
          </form>
          <div className={styles.forgotButton}>
            <Button link onClick={handleOpen}>
              Forgot Password?
            </Button>
          </div>
        </div>

        <div className={styles.containerButton}>
          <Link to="/signup">
            <Button large>Sign Up</Button>
          </Link>
        </div>
      </div>

      {/* MODAL FOR RESET PASSWORD */}
      {open && (
        <div className={styles.modalContainerWrap}>
          <div className={styles.modalContainer}>
            <Button icon="cancel" iconStyle onClick={handleOpen} />
            <h2>Forgot password?</h2>
            <h4>
              Don't worry. Reseting your password is easy. <br></br> Just type
              in the email you registered.
            </h4>
            <form
              className={styles.form}
              noValidate
              onSubmit={handleSubmitReset}
              method="POST"
            >
              <EmailInput isValid={isValid.email} setIsValid={setIsValid} />
              <Button block={!isValid.email} submit large>
                Change Password
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default connect(
  createStructuredSelector({
    loading: userLoadingSelector,
    userLoadSuccess: userSuccessLoadSelector,
    redirectTo: userOAuthRedirectSelector,
  }),
  { userLogin, userOAuth, forgotPassword }
)(Login);
