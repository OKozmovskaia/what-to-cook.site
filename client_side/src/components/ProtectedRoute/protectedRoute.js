import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { createStructuredSelector } from "reselect";
import { tokenSelector, userSuccessLoadSelector } from "../../redux/selectors";
import { userRemoveToken } from "../../redux/actions/user";

const ProtectedRoute = ({
  token,
  userLoadSuccess,
  userRemoveToken,
  children,
}) => {
  useEffect(() => {
    if (!userLoadSuccess && token) {
      userRemoveToken();
    }
  });

  if (!userLoadSuccess) {
    return (
      <div style={{ minHeight: "40vh" }}>
        <h1>Error 401</h1>
        <h2>
          To gain access to this page, please, <Link to="/login">log in</Link>
        </h2>
      </div>
    );
  }
  return children;
};

export default connect(
  createStructuredSelector({
    token: tokenSelector,
    userLoadSuccess: userSuccessLoadSelector,
  }),
  (dispatch) => ({
    userRemoveToken: () => dispatch(userRemoveToken()),
  })
)(ProtectedRoute);
