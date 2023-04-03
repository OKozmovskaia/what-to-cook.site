import React from "react";
import Button from "../Button";

import styles from "./socialMediaSet.module.css";

const SocialMediaSet = ({ handleOAuth }) => {
  const providers = ["github", "google", "facebook"];

  return (
    <div className={styles.container}>
      {providers.map((i) => (
        <Button key={i} iconStyle icon={i} onClick={() => handleOAuth(i)} />
      ))}
    </div>
  );
};

export default SocialMediaSet;
