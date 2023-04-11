import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  loadRecipesByQuery,
  updateFilters,
} from "../redux/actions/edamam_recipes";
import {
  userFiltersSelector,
  recipesSelector,
  recipesLoadingSelector,
  recipesLoadedSelector,
} from "../redux/selectors";
import { useMediaQuery } from "../hooks/useMediaQuery";

import Recipes from "../components/Recipes";
import Filters from "../components/Filters";
import SearchBar from "../components/SearchBar";
import FiltersBar from "../components/Filters/FiltersBar";
import Loader from "../components/Loader";

import styles from "./page.module.css";
import Button from "../components/Button";

function HomePage({
  findRecipes,
  userFilters,
  recipes,
  loading,
  loaded,
  updateFilters,
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    findRecipes("carrot");
  }, [findRecipes]);

  const isPageWide = useMediaQuery("(max-width: 740px)");

  const handleSearch = (query) => (e) => {
    e.preventDefault();
    findRecipes(query);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  if (loaded) updateFilters();

  if (Object.keys(recipes).length < 1 && loading) return <Loader />;

  if (Object.keys(recipes).length < 1 && !loading) {
    return (
      <div className={styles.container}>
        <aside className={styles.sidebar}></aside>
        <main className={styles.mainContent}>
          <SearchBar handleSearch={handleSearch} />
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
            }}
            iconStyle
            icon="filters"
            onClick={handleOpen}
          />
          <SearchBar handleSearch={handleSearch} />
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
          <SearchBar handleSearch={handleSearch} />
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
    userFilters: userFiltersSelector,
    loading: recipesLoadingSelector,
    loaded: recipesLoadedSelector,
  }),
  (dispatch) => ({
    findRecipes: (query) => dispatch(loadRecipesByQuery(query)),
    updateFilters: () => dispatch(updateFilters()),
  })
)(HomePage);
