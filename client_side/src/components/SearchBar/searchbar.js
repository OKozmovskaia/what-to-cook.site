import React from "react";
import { useState } from "react";
import { connect } from "react-redux";

import { findRecipes } from "../../redux/actions/edamam_recipes";
import { searchQuerySelector } from "../../redux/selectors";
import Button from "../Button";
import styles from "./searchbar.module.css";
import { createStructuredSelector } from "reselect";

const SearchBar = ({ findRecipes, queryUser }) => {
  const [query, setQuery] = useState(queryUser);

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    findRecipes(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      findRecipes(query);
    }
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        onChange={handleInput}
        defaultValue={query}
        onKeyDown={handleKeyPress}
      />
      <Button small onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default connect(
  createStructuredSelector({
    queryUser: searchQuerySelector,
  }),
  { findRecipes }
)(SearchBar);
