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
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader/loader";

import styles from "./home-page.module.css";

function HomePage({ recipes, count, nextChunk, loading, loaded, findRecipes }) {
  const [inputQuery, setInputQuery] = useState("");

  const handleInput = (e) => {
    setInputQuery(e.target.value);
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    findRecipes(inputQuery);
  };

  useEffect(() => {
    if (!loading && !loaded) findRecipes("carrot");
  }, [loading, loaded, findRecipes]);

  if (loading) return <Loader />;
  if (!loaded) return "No data :(";

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Sidebar title="Filter" />
      </aside>
      <main className={styles.mainContent}>
        <div className={styles.searchBarContainer}>
          <input
            type="text"
            placeholder="Type product or recipe name"
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
