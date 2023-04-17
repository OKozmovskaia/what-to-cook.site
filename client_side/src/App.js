import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { messageSelector } from "./redux/selectors";

import Footer from "./components/Footer/footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import HomePage from "./pages/home-page";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Message from "./components/Message";
import OAuth from "./components/OAuth";
import PasswordReset from "./components/PasswordReset";
import ProtectedRoute from "./components/ProtectedRoute";
import MyAccountPage from "./pages/myAccount-page";
import MyRecipes from "./pages/myRecipes-page";
import MyProducts from "./pages/myProducts-page";
import PrivacyPolicy from "./components/PrivacyPolicy";
import DataDeletion from "./components/DataDeletion";
import NotFound from "./components/NotFound/";
import GetToken from "./components/GetToken";
import Button from "./components/Button";

import styles from "./app.module.css";

function App({ message }) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {showButton && (
        <Button
          iconStyle
          icon="arrowUp"
          onClick={scrollToTop}
          className={styles.buttonToTop}
        />
      )}
      <GetToken />
      <Header />
      <Navbar />
      {message.body && <Message />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/oauth_callback/:provider" element={<OAuth />} />
        <Route path="/privacy_policy" element={<PrivacyPolicy />} />
        <Route path="/data-deletion-facebook" element={<DataDeletion />} />
        <Route
          path="/me"
          element={
            <ProtectedRoute>
              <MyAccountPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/password_reset/:token/:id"
          element={
            <ProtectedRoute>
              <PasswordReset />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my_recipes"
          element={
            <ProtectedRoute>
              <MyRecipes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my_products"
          element={
            <ProtectedRoute>
              <MyProducts />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default connect(
  createStructuredSelector({
    message: messageSelector,
  })
)(App);
