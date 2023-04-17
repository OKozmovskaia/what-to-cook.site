import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  loadMoreRecipes,
  updateRecipes,
} from "../../redux/actions/edamam_recipes";

import {
  recipesListSelector,
  recipesLoadMoreSelector,
  recipesLoadingSelector,
  recipesSelector,
} from "../../redux/selectors";

import Button from "../Button";
import Recipe from "./Recipe";
import Loader from "../Loader";

import styles from "./recipes.module.css";

const Recipes = ({
  recipes,
  recipesObject,
  nextChunk,
  loadMore,
  updateRecipes,
  loading,
}) => {
  useEffect(() => {
    updateRecipes();
  }, [nextChunk, updateRecipes]);

  const handleLoadMore = (link) => (e) => {
    e.preventDefault();
    loadMore(link);
  };

  return (
    <div className={styles.scrollContainer}>
      <p>
        {recipes.length} recipes matching your request. To found more scroll
        down.
      </p>
      <div className={styles.recipesContainer}>
        {recipes.map((item) => (
          <Recipe key={item[0]} id={item[0]} recipes={recipesObject} />
        ))}
      </div>
      {loading && <Loader />}
      {!loading && (
        <div className={styles.loadMoreButtonContainer}>
          <Button large onClick={handleLoadMore(nextChunk)} block={!nextChunk}>
            Find More
          </Button>
        </div>
      )}
    </div>
  );
};

export default connect(
  createStructuredSelector({
    recipes: recipesListSelector,
    recipesObject: recipesSelector,
    nextChunk: recipesLoadMoreSelector,
    loading: recipesLoadingSelector,
  }),
  (dispatch) => ({
    loadMore: (link) => dispatch(loadMoreRecipes(link)),
    updateRecipes: () => dispatch(updateRecipes()),
  })
)(Recipes);
