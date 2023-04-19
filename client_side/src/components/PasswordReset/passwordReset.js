import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { resetPassword } from "../../redux/actions/user";

import PasswordInput from "../PasswordInput";
import Button from "../Button";

import styles from "./passwordReset.module.css";

const PasswordReset = ({ resetPassword }) => {
  const [isValidPassword, setIsValidPassword] = useState({
    password: false,
  });

  const [isValidConfirmed, setIsValidConformed] = useState({
    password: false,
  });

  const [notMatch, setNotMatch] = useState(false);
  const { token, id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const dataForm = new FormData(form);
    const passwords = dataForm.getAll("password");

    if (passwords[0] !== passwords[1]) {
      setNotMatch(true);
      const timer = setTimeout(() => {
        setNotMatch(false);
      }, 4000);
      return () => clearTimeout(timer);
    }

    const data = {
      token,
      id,
      password: passwords[0],
    };

    resetPassword(data);
  };

  return (
    <div className={styles.container}>
      <h2>Create New Password</h2>
      <form noValidate method="POST" onSubmit={handleSubmit}>
        <PasswordInput
          label="New password:"
          isValid={isValidPassword.password}
          setIsValid={setIsValidPassword}
        />
        <PasswordInput
          label="Confirm new password:"
          isValid={isValidConfirmed.password}
          setIsValid={setIsValidConformed}
        />
        <div className={styles.warning}>
          {notMatch && <span>Passwords doesn't match</span>}
        </div>

        <Button
          block={
            !(isValidPassword.password && isValidConfirmed.password) || notMatch
          }
          submit
          large
        >
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default connect(null, { resetPassword })(PasswordReset);
