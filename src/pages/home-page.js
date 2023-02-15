import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { loadRecipesByQuery } from "../redux/actions";
import {
  recipesLoadedSelector,
  recipesLoadingSelector,
  userFiltersSelector,
} from "../redux/selectors";

import Recipes from "../components/Recipes";
import Filters from "../components/Filters";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import FiltersBar from "../components/Filters/FiltersBar";

import styles from "./home-page.module.css";

function HomePage({ findRecipes, userFilters, loading, loaded }) {
  useEffect(() => {
    findRecipes("carrot");
  }, [findRecipes]);

  const handleSearch = (query) => (e) => {
    e.preventDefault();
    findRecipes(query);
  };

  if (loading) return <Loader />;
  if (!loaded) return "No recepies that match your request";

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
    loading: recipesLoadingSelector,
    loaded: recipesLoadedSelector,
    userFilters: userFiltersSelector,
  }),
  (dispatch) => ({
    findRecipes: (query) => dispatch(loadRecipesByQuery(query)),
  })
)(HomePage);
