import { useEffect } from "react";
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";
import { tokenSelector } from "../../redux/selectors";
import { userLoad } from "../../redux/actions/user";

const GetToken = ({ token, userLoad }) => {
  useEffect(() => {
    if (token && token !== "null") {
      userLoad(token);
      const intervalId = setInterval(() => {
        userLoad(token);
      }, 900000);
      return () => clearInterval(intervalId);
    }
  }, [userLoad, token]);

  return null;
};

export default connect(
  createStructuredSelector({
    token: tokenSelector,
  }),
  (dispatch) => ({
    userLoad: (token) => dispatch(userLoad(token)),
  })
)(GetToken);
