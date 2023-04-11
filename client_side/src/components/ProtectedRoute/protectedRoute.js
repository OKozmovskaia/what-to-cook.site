import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

import { createStructuredSelector } from "reselect";
import { tokenSelector, userSuccessLoadSelector } from "../../redux/selectors";
import { userLoad, userRemoveToken } from "../../redux/actions/user";

const ProtectedRoute = ({
  token,
  userLoad,
  userLoadSuccess,
  userRemoveToken,
  children,
}) => {
  useEffect(() => {
    userLoad(token);
  });

  if (!userLoadSuccess) {
    userRemoveToken();
    return <Navigate to="/login" />;
  }

  return children;
};

export default connect(
  createStructuredSelector({
    token: tokenSelector,
    userLoadSuccess: userSuccessLoadSelector,
  }),
  (dispatch) => ({
    userLoad: (token) => dispatch(userLoad(token)),
    userRemoveToken: () => dispatch(userRemoveToken()),
  })
)(ProtectedRoute);
