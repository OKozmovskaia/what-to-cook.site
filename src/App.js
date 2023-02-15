import React from "react";
import Footer from "./components/Footer/footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import HomePage from "./pages/home-page";

function App() {
  return (
    <div>
      <Header />
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
