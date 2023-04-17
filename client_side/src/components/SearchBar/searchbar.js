import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { searchQuerySelector } from "../../redux/selectors";

import Button from "../Button";
import styles from "./searchbar.module.css";

const SearchBar = ({ handleSearch, queryUser }) => {
  const [query, setQuery] = useState(queryUser);

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className={styles.searchBarContainer}>
      <input type="text" onChange={handleInput} defaultValue={query} />
      <Button small onClick={handleSearch(query)}>
        Search
      </Button>
    </div>
  );
};

export default connect((state) => ({
  queryUser: searchQuerySelector(state),
}))(SearchBar);
