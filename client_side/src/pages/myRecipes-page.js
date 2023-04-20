import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { getAllUserRecipes } from "../redux/actions/user_recipes";
import {
  userRecipesLoadingSelector,
  userRecipesListSelector,
  userRecipesSelector,
} from "../redux/selectors";

import Loader from "../components/Loader";
import ListItem from "../components/ListItem";
import Recipe from "../components/Recipes/Recipe";
import styles from "./page.module.css";
import Button from "../components/Button/button";

function MyRecipesPage({
  getAllUserRecipes,
  recipesObject,
  recipesList,
  loading,
}) {
  useEffect(() => {
    getAllUserRecipes();
  }, [getAllUserRecipes]);

  const isPageWide = useMediaQuery("(max-width: 740px)");

  const refs = recipesList.reduce((acc, item) => {
    acc[item[0]] = React.createRef();
    return acc;
  }, {});

  const handleScroll = (id) => {
    refs[id].current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  if (recipesList.length < 1 && loading) return <Loader />;
  if (recipesList.length < 1 && !loading) {
    return (
      <div className={styles.container}>
        <aside className={styles.sidebar}></aside>
        <main className={styles.mainContent}>
          <h2>You have not saved any recipes yet.</h2>{" "}
          <h4>
            {" "}
            Go to <Link to="/">Home page</Link>
            <br></br>
            and choose your first recipe.
          </h4>
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
              <Button key={i[0]} onClick={() => handleScroll(i[0])} noStyle>
                <ListItem id={i[0]} item={i[1].label} />
              </Button>
            ))}
          </ul>
        </aside>
      )}

      <main className={styles.mainContent}>
        <div className={styles.recipesContainer}>
          {recipesList.map((i) => (
            <div ref={refs[i[0]]} key={i[0]}>
              <Recipe id={i[0]} recipes={recipesObject} />
            </div>
          ))}
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
  { getAllUserRecipes }
)(MyRecipesPage);
