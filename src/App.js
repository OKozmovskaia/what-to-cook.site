import React from "react";
import { Route, Routes } from "react-router-dom";

import Footer from "./components/Footer/footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import HomePage from "./pages/home-page";
import LoginPage from "./pages/login-page";
import SignupPage from "./pages/signup-page";

function App() {
  return (
    <div>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/log-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
