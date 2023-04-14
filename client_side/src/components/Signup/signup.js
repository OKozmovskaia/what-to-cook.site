import React, { useState } from "react";
import { connect } from "react-redux";
import { userCreate } from "../../redux/actions/user";
import { Link, Navigate } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {
  userLoadingSelector,
  userSuccessLoadSelector,
} from "../../redux/selectors";

import Button from "../Button";
import Loader from "../Loader";
import UserNameInput from "../UserNameInput";
import EmailInput from "../EmailInput";
import PasswordInput from "../PasswordInput";
import SocialMediaSet from "../SocialMediaSet";

import styles from "./signup.module.css";

const Signup = ({ userCreate, loading, userLoadSuccess }) => {
  const [isValid, setIsValid] = useState({
    username: false,
    email: false,
    password: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    userCreate(Object.fromEntries(data));
  };

  if (loading) return <Loader />;

  if (userLoadSuccess) return <Navigate to="/me" />;

  return (
    <div className={styles.containerAccount}>
      <div className={styles.containerForm}>
        <div className={styles.containerButton}>
          <Link to="/login">
            <Button large>Log In</Button>
          </Link>
        </div>

        <div className={styles.formSignUp}>
          <h3>Create your account</h3>
          <SocialMediaSet />
          <form
            className={styles.form}
            noValidate
            onSubmit={handleSubmit}
            method="POST"
          >
            <UserNameInput isValid={isValid.username} setIsValid={setIsValid} />
            <EmailInput isValid={isValid.email} setIsValid={setIsValid} />
            <PasswordInput
              label="Password:"
              isValid={isValid.password}
              setIsValid={setIsValid}
            />
            <Button
              block={!(isValid.email && isValid.password && isValid.username)}
              submit
              small
            >
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default connect(
  createStructuredSelector({
    loading: userLoadingSelector,
    userLoadSuccess: userSuccessLoadSelector,
  }),
  (dispatch) => ({
    userCreate: (data) => dispatch(userCreate(data)),
  })
)(Signup);
