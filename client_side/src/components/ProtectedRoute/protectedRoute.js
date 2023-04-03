import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { createStructuredSelector } from "reselect";
import { tokenSelector, userSuccessLoadSelector } from "../../redux/selectors";
import { setMessage, userLoad } from "../../redux/actions/user";

const ProtectedRoute = ({ token, userLoad, userLoadSuccess, setMessage }) => {
  useEffect(() => {
    if (token !== "null" || token !== "undefined") {
      userLoad(token);
    } else {
      setMessage({
        body: "To go to this page you should be logged in.",
        success: true,
        error: false,
      });
      <Navigate to="/login" />;
    }
  }, [token, userLoad, setMessage]);

  if (!userLoadSuccess) {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("USER_ID");
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default connect(
  createStructuredSelector({
    token: tokenSelector,
    userLoadSuccess: userSuccessLoadSelector,
  }),
  (dispatch) => ({
    userLoad: (token) => dispatch(userLoad(token)),
    setMessage: (message) => dispatch(setMessage(message)),
  })
)(ProtectedRoute);
