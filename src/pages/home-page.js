import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { loadRecipesByQuery } from "../redux/actions";
import {
  recipesCountSelector,
  recipesLoadedSelector,
  recipesLoadingSelector,
  recipesSelector,
  recipesLoadMoreSelector,
} from "../redux/selectors";

import Button from "../components/Button";
import Recipe from "../components/Recipe";
import Filters from "../components/Filters/filters";
import Loader from "../components/Loader/loader";

import styles from "./home-page.module.css";

function HomePage({ recipes, count, nextChunk, loading, loaded, findRecipes }) {
  const [inputQuery, setInputQuery] = useState("");

  useEffect(() => {
    if (!loading && !loaded) findRecipes("carrot");
  }, [loading, loaded, findRecipes]);

  const handleInput = (e) => {
    setInputQuery(e.target.value);
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    findRecipes(inputQuery);
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
          <Button small onClick={handleOnClick}>
            Search
          </Button>
        </div>
        <p>We found {count} recipes</p>
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
    recipes: recipesSelector,
    count: recipesCountSelector,
    nextChunk: recipesLoadMoreSelector,
    loading: recipesLoadingSelector,
    loaded: recipesLoadedSelector,
  }),
  (dispatch) => ({
    findRecipes: (query) => dispatch(loadRecipesByQuery(query)),
  })
)(HomePage);
