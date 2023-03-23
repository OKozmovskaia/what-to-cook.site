import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { getAllUserProducts } from "../redux/actions/user_products";
import {
  userProductsLoadingSelector,
  userProductsListSelector,
} from "../redux/selectors";

import Loader from "../components/Loader";
import ListItem from "../components/ListItem";
import Button from "../components/Button";
import styles from "./page.module.css";

function MyProductsPage({ getAllProducts, productsList, loading }) {
  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const isPageWide = useMediaQuery("(max-width: 740px)");

  if (productsList.length < 1 && loading) return <Loader />;
  if (productsList.length < 1 && !loading) {
    return (
      <div className={styles.container}>
        <aside className={styles.sidebar}></aside>
        <main className={styles.mainContent}>
          <h2>
            You have not saved any products yet. Go to{" "}
            <Link to="/">Home page</Link>
            <br></br>
            and choose your first tasty recipe.<br></br>
            Inside of the recipe card you could save any ingridients as your
            product.
          </h2>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {!isPageWide && <aside className={styles.sidebar}></aside>}

      <main className={styles.mainContent}>
        <div className={styles.outerRecipes}>
          <div className={styles.recipesContainer}>
            <ul>
              {productsList.map((i) => (
                <ListItem key={i[0]} item={i[1].title} checkBox id={i[0]}>
                  <Button iconStyle icon="pen" />
                  <Button iconStyle icon="bin" />
                </ListItem>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default connect(
  createStructuredSelector({
    productsList: userProductsListSelector,
    loading: userProductsLoadingSelector,
  }),
  (dispatch) => ({
    getAllProducts: () => dispatch(getAllUserProducts()),
  })
)(MyProductsPage);
