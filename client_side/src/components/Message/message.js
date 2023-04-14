import React, { useEffect } from "react";
import { connect } from "react-redux";
import { messageSelector } from "../../redux/selectors";
import { clearMessage } from "../../redux/actions/user";

import Button from "../Button";
import styles from "./message.module.css";
import cn from "classnames";
import { createStructuredSelector } from "reselect";

const Message = ({ message, clearMessage }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      clearMessage();
    }, 4500);
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
      <Button
        currentColor
        iconStyle
        icon="cancel"
        onClick={() => clearMessage()}
      />
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
