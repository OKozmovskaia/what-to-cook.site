import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  userNameSelector,
  emailSelector,
  tokenSelector,
  idSelector,
  numberRecipesSelector,
  numberProductsSelector,
} from "../redux/selectors";
import { userRemoveToken } from "../redux/actions/user";
import { getAllUserProducts } from "../redux/actions/user_products";
import { getAllUserRecipes } from "../redux/actions/user_recipes";
import { useMediaQuery } from "../hooks/useMediaQuery";

import Button from "../components/Button";
import styles from "./page.module.css";

const MyAccountPage = ({
  username,
  email,
  token,
  id,
  numberRecipes,
  numberProducts,
  userRemoveToken,
  getAllUserProducts,
  getAllUserRecipes,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (numberRecipes < 1) {
      getAllUserRecipes();
    }

    if (numberProducts < 1) {
      getAllUserProducts();
    }
  }, [numberProducts, numberRecipes, getAllUserProducts, getAllUserRecipes]);

  const handleLogOut = () => {
    userRemoveToken();
    return navigate("/login");
  };

  const isPageWide = useMediaQuery("(max-width: 740px)");
  return (
    <div className={styles.container}>
      {!isPageWide && <aside className={styles.sidebar}></aside>}
      <main className={styles.mainContent}>
        <h2>Hello, {username}</h2>
        <div>
          <h3>Your email: {email}</h3>
          <Button
            onClick={() => navigate(`/password_reset/${token}/${id}`)}
            large
          >
            Change Password
          </Button>
        </div>

        <div className={styles.infoBoxesContainer}>
          <Link to="/my_recipes">
            <div className={styles.infoBox}>
              You saved {numberRecipes} recipes.<br></br> Look them.
            </div>
          </Link>
          <Link to="/my_products">
            <div className={styles.infoBox}>
              You saved {numberProducts} products.<br></br> Check them.
            </div>
          </Link>
        </div>
        <div>
          <Button onClick={handleLogOut} large>
            Log Out
          </Button>
        </div>
      </main>
    </div>
  );
};

export default connect(
  createStructuredSelector({
    username: userNameSelector,
    email: emailSelector,
    token: tokenSelector,
    id: idSelector,
    numberRecipes: numberRecipesSelector,
    numberProducts: numberProductsSelector,
  }),
  { userRemoveToken, getAllUserProducts, getAllUserRecipes }
)(MyAccountPage);
