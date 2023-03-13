import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { userOAuthCallback } from "../../redux/actions";
import {
  userLoadingSelector,
  userSuccessLoadSelector,
} from "../../redux/selectors";

import Loader from "../Loader";

const OAuth = ({ loadSuccess, loading, oauth_callback }) => {
  const { provider } = useParams();
  const [params] = useSearchParams();
  const code = params.get("code");

  useEffect(() => {
    if (!loadSuccess) oauth_callback(code, { provider });
  }, [code, provider, oauth_callback, loadSuccess]);

  if (loadSuccess) return <Navigate to="/me" />;

  if (loading) return <Loader />;

  if (!loadSuccess)
    return (
      <div style={{ height: "10em" }}>
        <h3>An error occurred while performing authentication</h3>
      </div>
    );

  return (
    <div style={{ height: "10em" }}>
      <h3>It's performing authentication with {provider}...</h3>
    </div>
  );
};

export default connect(
  createStructuredSelector({
    loading: userLoadingSelector,
    loadSuccess: userSuccessLoadSelector,
  }),
  (dispatch) => ({
    oauth_callback: (code, provider) =>
      dispatch(userOAuthCallback(code, provider)),
  })
)(OAuth);
