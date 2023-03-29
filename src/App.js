import React from "react";
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

function App({ message }) {
  return (
    <div>
      <Header />
      <Navbar />
      {message.body && <Message />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/oauth_callback/:provider" element={<OAuth />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/me" element={<MyAccountPage />} />
          <Route
            path="/password_reset/:token/:id"
            element={<PasswordReset />}
          />
          <Route path="/my_recipes" element={<MyRecipes />} />
          <Route path="/my_products" element={<MyProducts />} />
        </Route>
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
