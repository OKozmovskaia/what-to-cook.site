import React, { useEffect } from "react";
import { connect } from "react-redux";
import { messageSelector } from "../../redux/selectors";
import { clearMessage } from "../../redux/actions";

import styles from "./message.module.css";
import cn from "classnames";
import { createStructuredSelector } from "reselect";

const Message = ({ message, clearMessage }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      clearMessage();
    }, 5000);
    return () => clearTimeout(timer);
  }, [clearMessage, message]);

  return (
    <div
      className={cn(styles.container, {
        [styles.success]: message.success,
        [styles.error]: message.error,
      })}
    >
      <div>{message.body}</div>
    </div>
  );
};

export default connect(
  createStructuredSelector({
    message: messageSelector,
  }),
  (dispatch) => ({
    clearMessage: () => dispatch(clearMessage()),
  })
)(Message);
