import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { userOAuthCallback } from "../../redux/actions/user";
import {
  userLoadingSelector,
  userSuccessLoadSelector,
} from "../../redux/selectors";

import Loader from "../Loader";

const OAuth = ({ loadSuccess, loading, userOAuthCallback }) => {
  const { provider } = useParams();
  const [params] = useSearchParams();
  const code = params.get("code");

  useEffect(() => {
    if (!loadSuccess) userOAuthCallback(code, { provider });
  }, [code, provider, userOAuthCallback, loadSuccess]);

  if (loading) return <Loader />;

  if (!loadSuccess)
    return (
      <div style={{ height: "20em" }}>
        <h3>An error occurred while performing authentication</h3>
      </div>
    );

  if (loadSuccess) return <Navigate to="/me" />;

  return (
    <div style={{ height: "20em" }}>
      <h3>It's performing authentication with {provider}...</h3>
    </div>
  );
};

export default connect(
  createStructuredSelector({
    loading: userLoadingSelector,
    loadSuccess: userSuccessLoadSelector,
  }),
  { userOAuthCallback }
)(OAuth);
