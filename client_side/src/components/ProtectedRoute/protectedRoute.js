import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { createStructuredSelector } from "reselect";
import { userSuccessLoadSelector } from "../../redux/selectors";
import { userRemoveToken } from "../../redux/actions/user";

const ProtectedRoute = ({ userLoadSuccess, userRemoveToken, children }) => {
  useEffect(() => {
    if (!userLoadSuccess) {
      userRemoveToken();
    }
  });

  if (userLoadSuccess) return children;

  return (
    <div style={{ minHeight: "40vh" }}>
      <h1>Error 401</h1>
      <h2>
        To gain access to this page <Link to="/login">login page</Link>
      </h2>
    </div>
  );
};

export default connect(
  createStructuredSelector({
    userLoadSuccess: userSuccessLoadSelector,
  }),
  (dispatch) => ({
    userRemoveToken: () => dispatch(userRemoveToken()),
  })
)(ProtectedRoute);
