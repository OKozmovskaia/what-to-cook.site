import React from "react";
import Button from "../Button";

import styles from "./socialMediaSet.module.css";

const SocialMediaSet = () => {
  return (
    <div className={styles.container}>
      <Button iconStyle icon="github" />
      <Button iconStyle icon="google" />
      <Button iconStyle icon="facebook" />
    </div>
  );
};

export default SocialMediaSet;
