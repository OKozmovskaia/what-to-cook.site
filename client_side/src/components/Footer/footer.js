import React from "react";
import Button from "../Button";
import { Link } from "react-router-dom";

import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.iconContainer}>
        <Link to="mailto:info@what-to-cook.syte">
          <Button iconStyle icon="email" />
        </Link>

        <Link to="https://github.com/OKozmovskaia/what-to-cook.site">
          <Button iconStyle icon="github" />
        </Link>

        <Link to="https://www.linkedin.com/in/olga-kozmovskaia/">
          <Button iconStyle icon="linkedin" />
        </Link>
      </div>
      <p>© Olga Kozmovskaia</p>
    </footer>
  );
};

export default Footer;
