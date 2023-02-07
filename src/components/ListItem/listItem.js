import React from "react";
import styles from "./listItem.module.css";

export default function ListItem({
  checkBox,
  onChange,
  title,
  name,
  children,
}) {
  return (
    <li className={styles.container}>
      {checkBox && (
        <input type="checkBox" name={name} value={title} onChange={onChange} />
      )}
      {title}
      {children}
    </li>
  );
}
