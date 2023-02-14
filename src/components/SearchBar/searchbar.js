import React from "react";
import { useState } from "react";

import Button from "../Button";
import styles from "./searchbar.module.css";

const SearchBar = ({ handleSearch }) => {
  const [query, setQuery] = useState("");

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        placeholder={query ? query : "Type product or recipe name"}
        onChange={handleInput}
      />
      <Button small onClick={handleSearch(query)}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
