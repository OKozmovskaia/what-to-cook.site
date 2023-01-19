import React from "react";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.container}>
      <p>Home</p>
      <p>My recipes</p>
      <p>My product</p>
    </div>
  );
}
