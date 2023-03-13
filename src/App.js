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
import MyAccount from "./components/MyAccount";
import Message from "./components/Message";
import OAuth from "./components/OAuth";

function App({ message }) {
  return (
    <div>
      <Header />
      <Navbar />
      {message.body && <Message />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/me" element={<MyAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/oauth_callback/:provider" element={<OAuth />} />
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
