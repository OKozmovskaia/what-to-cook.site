import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { cleanString } from "../redux/utils/cleanString";
import { toHoursAndMin } from "../redux/utils/toHoursAndMin";
import {
  loadRecipesByQuery,
  removeFilter,
  updateRecipes,
} from "../redux/actions";
import {
  recipesListSelector,
  recipesLoadedSelector,
  recipesLoadingSelector,
  recipesLoadMoreSelector,
  userFiltersSelector,
  filtersSelector,
} from "../redux/selectors";

import Button from "../components/Button";
import Recipe from "../components/Recipe";
import Filters from "../components/Filters/filters";
import Loader from "../components/Loader/loader";

import styles from "./home-page.module.css";

function HomePage({
  recipes,
  filters,
  userFilters,
  removeFilter,
  updateRecipes,
  nextChunk,
  loading,
  loaded,
  findRecipes,
}) {
  const [inputQuery, setInputQuery] = useState("");

  useEffect(() => {
    findRecipes("carrot");
  }, [findRecipes]);

  const handleInput = (e) => {
    setInputQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    findRecipes(inputQuery);
  };

  const handleRemove = (id) => (e) => {
    e.preventDefault();
    removeFilter(id);
    updateRecipes();
  };

  const handleLoadMore = () => {};

  if (loading) return <Loader />;
  if (!loaded) return "No data :(";

  return (
    <div className={styles.container}>
      {/* ASIDE FILTERS */}
      <aside className={styles.sidebar}>
        <Filters />
      </aside>
      <main className={styles.mainContent}>
        {/* SEARCH BAR */}
        <div className={styles.searchBarContainer}>
          <input
            type="text"
            placeholder={
              inputQuery ? inputQuery : "Type product or recipe name"
            }
            onChange={handleInput}
          />
          <Button small onClick={handleSearch}>
            Search
          </Button>
        </div>
        <div>
          <p>We found {recipes.length} recipes</p>
          {/* FILTERS BADGES */}
          {userFilters.map((id) => (
            <div className={styles.badge} key={id}>
              {filters[id].label === "totalTime"
                ? toHoursAndMin(filters[id].value)
                : cleanString(filters[id].value)}
              <Button icon="cancel" iconStyle onClick={handleRemove(id)} />
            </div>
          ))}
        </div>

        {/* LIST OF RECIPES */}
        <div className={styles.scrollContainer}>
          {recipes.map((item) => (
            <Recipe key={item[0]} id={item[0]} />
          ))}
        </div>

        {/* LOAD MORE BUTTON */}
        <div>
          <Button large onClick={handleLoadMore}>
            Load More
          </Button>
        </div>
      </main>
    </div>
  );
}

export default connect(
  createStructuredSelector({
    recipes: recipesListSelector,
    filters: filtersSelector,
    nextChunk: recipesLoadMoreSelector,
    loading: recipesLoadingSelector,
    loaded: recipesLoadedSelector,
    userFilters: userFiltersSelector,
  }),
  (dispatch) => ({
    findRecipes: (query) => dispatch(loadRecipesByQuery(query)),
    removeFilter: (category) => dispatch(removeFilter(category)),
    updateRecipes: () => dispatch(updateRecipes()),
  })
)(HomePage);
