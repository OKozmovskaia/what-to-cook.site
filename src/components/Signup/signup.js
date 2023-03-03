import React, { useState } from "react";
import { connect } from "react-redux";
import { userCreate } from "../../redux/actions";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { userLoadingSelector, tokenSelector } from "../../redux/selectors";

import Button from "../Button";
import Loader from "../Loader";
import UserNameInput from "../UserNameInput";
import EmailInput from "../EmailInput";
import PasswordInput from "../PasswordInput";
import SocialMediaSet from "../SocialMediaSet";

import styles from "./signup.module.css";

const Signup = ({ userCreate, loading, token }) => {
  const [isValid, setIsValid] = useState({
    username: false,
    email: false,
    password: false,
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    userCreate(Object.fromEntries(data));
    navigate("/me");
  };

  if (loading) return <Loader />;

  if (token) return <Navigate to="/me" />;

  return (
    <div className={styles.containerAccount}>
      <div className={styles.containerForm}>
        <div className={styles.containerButton}>
          <Link to="/login">
            <Button large>Log In</Button>
          </Link>
        </div>

        <div className={styles.formSignUp}>
          <h3>Create your Chef account</h3>
          <SocialMediaSet />
          <form
            className={styles.form}
            noValidate
            onSubmit={handleSubmit}
            method="POST"
          >
            <UserNameInput isValid={isValid.username} setIsValid={setIsValid} />
            <EmailInput isValid={isValid.email} setIsValid={setIsValid} />
            <PasswordInput isValid={isValid.password} setIsValid={setIsValid} />
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
    token: tokenSelector,
  }),
  (dispatch) => ({
    userCreate: (data) => dispatch(userCreate(data)),
  })
)(Signup);
