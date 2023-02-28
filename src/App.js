import React from "react";
import { Route, Routes } from "react-router-dom";

import Footer from "./components/Footer/footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import HomePage from "./pages/home-page";
import AccountPage from "./pages/account-page";

function App() {
  return (
    <div>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account/*" element={<AccountPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
