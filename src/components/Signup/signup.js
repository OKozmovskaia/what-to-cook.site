import React, { useState } from "react";
import { connect } from "react-redux";
import { userCreate } from "../../redux/actions";

import Button from "../Button";
import UserNameInput from "../UserNameInput";
import EmailInput from "../EmailInput";
import PasswordInput from "../PasswordInput";
import SocialMediaSet from "../SocialMediaSet";

import styles from "./signup.module.css";

const Login = ({ userCreate }) => {
  const [isValid, setIsValid] = useState({
    username: false,
    email: false,
    password: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    // userCreate(data);
  };

  return (
    <div className={styles.container}>
      <h3>Create your Chef account</h3>
      <SocialMediaSet />
      <form
        className={styles.formSignUp}
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
  );
};

export default connect(null, (dispatch) => ({
  userCreate: (data) => dispatch(userCreate(data)),
}))(Login);
