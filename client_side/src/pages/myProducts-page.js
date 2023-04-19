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
import ProductItem from "../components/ProductItem/";
import styles from "./page.module.css";
import Button from "../components/Button/button";

function MyProductsPage({ getAllUserProducts, productsList, loading }) {
  useEffect(() => {
    getAllUserProducts();
  }, [getAllUserProducts]);

  const isPageWide = useMediaQuery("(max-width: 740px)");

  if (productsList.length < 1 && loading) return <Loader />;
  if (productsList.length < 1 && !loading) {
    return (
      <div className={styles.container}>
        <aside className={styles.sidebar}></aside>
        <main className={styles.mainContent}>
          <h2>You have not saved any products yet. </h2>{" "}
          <h4>
            Go to <Link to="/">Home page</Link>
            <br></br>
            and choose your first tasty recipe.<br></br>
            Inside of the recipe card you could save any ingridients as your
            product.
          </h4>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {!isPageWide && <aside className={styles.sidebar}></aside>}

      <main className={styles.mainContent}>
        <Button iconStyle icon="print" onClick={() => window.print()} />
        <ul>
          {productsList.map((i) => (
            <ProductItem key={i[0]} id={i[0]} product={i[1]} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default connect(
  createStructuredSelector({
    productsList: userProductsListSelector,
    loading: userProductsLoadingSelector,
  }),
  { getAllUserProducts }
)(MyProductsPage);
