import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../components/Login";
import Signup from "../components/Signup";

import styles from "./page.module.css";

const AccountPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerAccount}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
};

export default AccountPage;
