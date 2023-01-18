import React from "react";
import styles from "./button.module.css";

export default function Button({ caption, className }) {
  return <button className={styles[className]}>{caption}</button>;
}
