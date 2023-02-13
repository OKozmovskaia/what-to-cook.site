import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { loadMoreRecipes, updateRecipes } from "../../redux/actions";

import {
  recipesListSelector,
  recipesLoadMoreSelector,
} from "../../redux/selectors";

import Button from "../Button";
import Recipe from "./Recipe";

import styles from "./recipes.module.css";

const Recipes = ({ recipes, nextChunk, loadMore, updateRecipes }) => {
  useEffect(() => {
    updateRecipes();
  }, [loadMore, updateRecipes]);

  const handleLoadMore = (link) => (e) => {
    e.preventDefault();
    loadMore(link);
  };

  return (
    <div>
      <div className={styles.scrollContainer}>
        {recipes.map((item) => (
          <Recipe key={item[0]} id={item[0]} />
        ))}
      </div>

      <div className={styles.loadMoreButtonContainer}>
        <Button large onClick={handleLoadMore(nextChunk)}>
          Load More
        </Button>
      </div>
    </div>
  );
};

export default connect(
  createStructuredSelector({
    recipes: recipesListSelector,
    nextChunk: recipesLoadMoreSelector,
  }),
  (dispatch) => ({
    loadMore: (link) => dispatch(loadMoreRecipes(link)),
    updateRecipes: () => dispatch(updateRecipes()),
  })
)(Recipes);
