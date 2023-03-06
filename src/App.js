import React from "react";
import { Route, Routes } from "react-router-dom";

import Footer from "./components/Footer/footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import HomePage from "./pages/home-page";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MyAccount from "./components/MyAccount";
import Message from "./components/Message";

function App() {
  return (
    <div>
      <Header />
      <Navbar />
      <Message />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/me" element={<MyAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
