import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { getAllUserRecipes } from "../redux/actions";
import {
  userRecipesLoadingSelector,
  userRecipesListSelector,
  userRecipesSelector,
} from "../redux/selectors";

import Loader from "../components/Loader";
import ListItem from "../components/ListItem";
import Recipe from "../components/Recipes/Recipe";
import styles from "./page.module.css";

function MyRecipesPage({ getAllRecipes, recipesObject, recipesList, loading }) {
  useEffect(() => {
    getAllRecipes();
  }, [getAllRecipes]);

  const isPageWide = useMediaQuery("(max-width: 740px)");

  if (recipesList.length < 1 && loading) return <Loader />;
  if (recipesList.length < 1 && !loading) {
    return (
      <div className={styles.container}>
        <aside className={styles.sidebar}></aside>
        <main className={styles.mainContent}>
          <h2>
            You have not saved any recipes yet. Go to{" "}
            <Link to="/">Home page</Link>
            <br></br>
            and choose your first tasty recipe.
          </h2>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {!isPageWide && (
        <aside className={styles.sidebar}>
          <ul>
            {recipesList.map((i) => (
              <ListItem key={i[0]} id={i[0]} item={i[1].label} />
            ))}
          </ul>
        </aside>
      )}

      <main className={styles.mainContent}>
        <div className={styles.outerRecipes}>
          <div className={styles.recipesContainer}>
            {recipesList.map((i) => (
              <Recipe key={i[0]} id={i[0]} recipes={recipesObject} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default connect(
  createStructuredSelector({
    recipesObject: userRecipesSelector,
    recipesList: userRecipesListSelector,
    loading: userRecipesLoadingSelector,
  }),
  (dispatch) => ({
    getAllRecipes: () => dispatch(getAllUserRecipes()),
  })
)(MyRecipesPage);
