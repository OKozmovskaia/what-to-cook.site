import React from "react";
import styles from "./listItem.module.css";

export default function ListItem({ checkBox, title, children }) {
  return (
    <li className={styles.container}>
      {checkBox && <input type="checkBox" name="search" value={title} />}
      {title}
      {children}
    </li>
  );
}
