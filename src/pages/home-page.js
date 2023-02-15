import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { loadRecipesByQuery } from "../redux/actions";
import {
  userFiltersSelector,
  recipesSelector,
  recipesLoadingSelector,
} from "../redux/selectors";

import Recipes from "../components/Recipes";
import Filters from "../components/Filters";
import SearchBar from "../components/SearchBar";
import FiltersBar from "../components/Filters/FiltersBar";
import Loader from "../components/Loader";

import styles from "./home-page.module.css";

function HomePage({ findRecipes, userFilters, recipes, loading }) {
  useEffect(() => {
    findRecipes("carrot");
  }, [findRecipes]);

  const handleSearch = (query) => (e) => {
    e.preventDefault();
    findRecipes(query);
  };

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
  }),
  (dispatch) => ({
    findRecipes: (query) => dispatch(loadRecipesByQuery(query)),
  })
)(HomePage);
