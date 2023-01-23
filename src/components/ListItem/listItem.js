import React from "react";
import styles from "./listItem.module.css";

export default function ListItem({ checkBox, title, children }) {
  return (
    <div className={styles.container}>
      {checkBox && <input type="checkBox" name="search" value={title} />}
      {title}
      {children}
    </div>
  );
}
