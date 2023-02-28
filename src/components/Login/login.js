import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { userLogin } from "../../redux/actions";

import Button from "../Button";
import EmailInput from "../EmailInput";
import PasswordInput from "../PasswordInput";
import SocialMediaSet from "../SocialMediaSet";

import styles from "./login.module.css";

const Login = ({ userLogin }) => {
  const [isValid, setIsValid] = useState({
    email: false,
    password: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    // userLogin(data);
  };

  return (
    <div className={styles.containerForm}>
      <div className={styles.formLogin}>
        <h3>Log in to your Chef account</h3>
        <SocialMediaSet />
        <form
          className={styles.form}
          noValidate
          onSubmit={handleSubmit}
          method="POST"
        >
          <EmailInput isValid={isValid.email} setIsValid={setIsValid} />
          <PasswordInput isValid={isValid.password} setIsValid={setIsValid} />
          <Button block={!(isValid.email && isValid.password)} submit small>
            Log In
          </Button>
        </form>
      </div>

      <div className={styles.containerButton}>
        <Link to="../signup">
          <Button large>Sign Up</Button>
        </Link>
      </div>
    </div>
  );
};

export default connect(null, (dispatch) => ({
  userLogin: (data) => dispatch(userLogin(data)),
}))(Login);