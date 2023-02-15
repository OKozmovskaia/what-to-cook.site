import React from "react";
import Button from "../Button";

import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.iconContainer}>
        <Button iconStyle icon="cv" />
        <Button iconStyle icon="email" />
        <Button iconStyle icon="github" />
        <Button iconStyle icon="linkedin" />
      </div>
      <p>© Olga Kozmovskaia</p>
    </footer>
  );
};

export default Footer;
