import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { loadRecipesByQuery } from "../redux/actions";

import Button from "../components/Button";
import Recipe from "../components/Recipe";
import Sidebar from "../components/Sidebar";

import styles from "./home-page.module.css";

function HomePage({ findRecipes }) {
  const [inputQuery, setInputQuery] = useState("");

  const handleInput = (e) => {
    setInputQuery(e.target.value);
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    findRecipes(inputQuery);
  };

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
        <div className={styles.scrollContainer}>
          <Recipe />
          <Recipe />
          <Recipe />
        </div>
      </main>
    </div>
  );
}

export default connect(null, (dispatch) => ({
  findRecipes: (query) => dispatch(loadRecipesByQuery(query)),
}))(HomePage);
