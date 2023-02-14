import React, { useEffect, useState, useRef } from "react";
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
  const [isVisible, setIsVisible] = useState(false);
  const divScroll = useRef(null);

  useEffect(() => {
    updateRecipes();
  }, [loadMore, updateRecipes]);

  const handleLoadMore = (link) => (e) => {
    e.preventDefault();
    loadMore(link);
  };

  const toggleVisible = (e) => {
    const scrolled = e.currentTarget.scrollTop;
    if (scrolled > 200) {
      setIsVisible(true);
    } else if (scrolled <= 200) {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    divScroll.current.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.scrollContainer}>
      {isVisible && (
        <Button
          iconStyle
          icon="arrowUp"
          onClick={scrollToTop}
          className={styles.buttonToTop}
        />
      )}

      <div
        className={styles.outerRecipes}
        onScroll={toggleVisible}
        ref={divScroll}
      >
        <div className={styles.recipesContainer}>
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
