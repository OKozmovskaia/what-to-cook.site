import React from "react";
import styles from "./message.module.css";
import cn from "classnames";

const Message = () => {
  return (
    <div className={cn(styles.container, styles.success)}>
      <div>MESSAGE</div>
    </div>
  );
};

export default Message;
