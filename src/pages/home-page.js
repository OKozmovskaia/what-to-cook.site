import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  loadRecipesByQuery,
  removeFilter,
  updateRecipes,
} from "../redux/actions";
import {
  recipesCountSelector,
  updateRecipesSelector,
  recipesLoadedSelector,
  recipesLoadingSelector,
  recipesLoadMoreSelector,
  filtersSelector,
} from "../redux/selectors";

import Button from "../components/Button";
import Recipe from "../components/Recipe";
import Filters from "../components/Filters/filters";
import Loader from "../components/Loader/loader";

import styles from "./home-page.module.css";

function HomePage({
  recipes,
  updateRecipes,
  count,
  nextChunk,
  loading,
  loaded,
  findRecipes,
  filtersList,
  removeFilter,
}) {
  const [inputQuery, setInputQuery] = useState("");

  useEffect(() => {
    if (!loading && !loaded) findRecipes("carrot");
  }, [loading, loaded, findRecipes]);

  const handleInput = (e) => {
    setInputQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    findRecipes(inputQuery);
  };

  const handleRemove = (key, value) => (e) => {
    e.preventDefault();
    removeFilter([{ key, value }]);
    updateRecipes();
  };

  if (loading) return <Loader />;
  if (!loaded) return "No data :(";

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Filters />
      </aside>
      <main className={styles.mainContent}>
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
          <p>We found {count} recipes</p>
          {filtersList.map((i) => (
            <div className={styles.badge} key={i.value}>
              {i.value}
              <Button
                icon="cancel"
                iconStyle
                onClick={handleRemove(i.key, i.value)}
              />
            </div>
          ))}
        </div>

        <div className={styles.scrollContainer}>
          {recipes.map((item) => (
            <Recipe key={item.id} recipe={item.recipe} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default connect(
  createStructuredSelector({
    recipes: updateRecipesSelector,
    count: recipesCountSelector,
    nextChunk: recipesLoadMoreSelector,
    loading: recipesLoadingSelector,
    loaded: recipesLoadedSelector,
    filtersList: filtersSelector,
  }),
  (dispatch) => ({
    findRecipes: (query) => dispatch(loadRecipesByQuery(query)),
    removeFilter: (category) => dispatch(removeFilter(category)),
    updateRecipes: () => dispatch(updateRecipes()),
  })
)(HomePage);
