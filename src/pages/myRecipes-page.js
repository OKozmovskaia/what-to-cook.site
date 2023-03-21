import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { getAllUserRecipes } from "../redux/actions";
import {
  userLoadingSelector,
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

  if (recipesList.length < 1 && loading) return <Loader />;
  if (recipesList.length < 1 && !loading) {
    return (
      <div className={styles.container}>
        <aside className={styles.sidebar}></aside>
        <main className={styles.mainContent}>
          <h2>
            You have not saved ant recipes. Go to Home page and choose your
            first perfect recipe.
          </h2>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h3>Side Bar</h3>
        <ul>
          {recipesList.map((i) => (
            <li>{i[1].label}</li>
          ))}
        </ul>
      </aside>

      <main className={styles.mainContent}>
        <h3>Recipes</h3>
        {recipesList.map((i) => (
          <Recipe key={i[0]} id={i[0]} recipes={recipesObject} />
        ))}
      </main>
    </div>
  );
}

export default connect(
  createStructuredSelector({
    recipesObject: userRecipesSelector,
    recipesList: userRecipesListSelector,
    loading: userLoadingSelector,
  }),
  (dispatch) => ({
    getAllRecipes: () => dispatch(getAllUserRecipes()),
  })
)(MyRecipesPage);
