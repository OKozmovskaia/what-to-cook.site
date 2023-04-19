import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import isDeepEqual from "fast-deep-equal";

import { findRecipes } from "../redux/actions/edamam_recipes";
import {
  userFiltersSelector,
  recipesSelector,
  recipesLoadingSelector,
  recipesLoadedSelector,
  searchQuerySelector,
} from "../redux/selectors";
import { useMediaQuery } from "../hooks/useMediaQuery";

import Recipes from "../components/Recipes";
import Filters from "../components/Filters";
import SearchBar from "../components/SearchBar";
import FiltersBar from "../components/Filters/FiltersBar";
import Loader from "../components/Loader";

import styles from "./page.module.css";
import Button from "../components/Button";

function HomePage({ findRecipes, userFilters, recipes, loading }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isDeepEqual(recipes, {})) {
      findRecipes("carrot");
    }
  }, [findRecipes, recipes]);

  const isPageWide = useMediaQuery("(max-width: 740px)");

  const handleOpen = () => {
    setOpen(!open);
  };

  if (Object.keys(recipes).length < 1 && loading) return <Loader />;

  if (Object.keys(recipes).length < 1 && !loading) {
    return (
      <div className={styles.container}>
        <aside className={styles.sidebar}></aside>
        <main className={styles.mainContent}>
          <SearchBar />
          <h3>No recipes match your request</h3>
        </main>
      </div>
    );
  }

  if (isPageWide) {
    return (
      <div className={styles.container}>
        <div className={styles.buttonFilterWrapper}>
          <Button
            style={{
              backgroundColor: "var(--yellow)",
              borderRadius: "50%",
              flexShrink: 0,
            }}
            iconStyle
            icon="filters"
            onClick={handleOpen}
          />
          <SearchBar />
        </div>

        {open ? (
          <div className={styles.filtersWrapper}>
            <Button icon="cancel" iconStyle onClick={handleOpen} />
            <Filters />
          </div>
        ) : null}

        {userFilters.length > 0 ? <FiltersBar /> : null}
        <Recipes />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Filters />
      </aside>

      <main className={styles.mainContent}>
        <div>
          <SearchBar />
          {userFilters.length > 0 ? <FiltersBar /> : null}
        </div>
        <Recipes />
      </main>
    </div>
  );
}

export default connect(
  createStructuredSelector({
    recipes: recipesSelector,
    queryUser: searchQuerySelector,
    userFilters: userFiltersSelector,
    loading: recipesLoadingSelector,
    loaded: recipesLoadedSelector,
  }),
  { findRecipes }
)(HomePage);
