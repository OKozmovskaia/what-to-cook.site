import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { cleanString } from "../redux/utils/cleanString";
import { toHoursAndMin } from "../redux/utils/toHoursAndMin";
import {
  loadRecipesByQuery,
  removeFilter,
  updateRecipes,
  removeAllFilters,
} from "../redux/actions";
import {
  recipesListSelector,
  recipesLoadedSelector,
  recipesLoadingSelector,
  userFiltersSelector,
  filtersSelector,
} from "../redux/selectors";

import Button from "../components/Button";
import Recipes from "../components/Recipes";
import Filters from "../components/Filters/filters";
import Loader from "../components/Loader/loader";

import styles from "./home-page.module.css";
import cn from "classnames";

function HomePage({
  recipes,
  filters,
  userFilters,
  removeFilter,
  removeAllFilters,
  updateRecipes,
  loading,
  loaded,
  findRecipes,
}) {
  const [inputQuery, setInputQuery] = useState("");

  useEffect(() => {
    findRecipes("carrot");
  }, [findRecipes]);

  const handleInput = (e) => {
    setInputQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    findRecipes(inputQuery);
  };

  const handleRemove = (id) => (e) => {
    e.preventDefault();
    removeFilter(id);
    updateRecipes();
  };

  const handleRemoveAll = (e) => {
    e.preventDefault();
    removeAllFilters();
    updateRecipes();
  };

  if (loading) return <Loader />;
  if (!loaded) return "No recepies that match your request";

  return (
    <div className={styles.container}>
      {/* ASIDE FILTERS */}
      <aside className={styles.sidebar}>
        <Filters />
      </aside>
      <main className={styles.mainContent}>
        {/* SEARCH BAR */}
        <div className={styles.searchBarContainer}>
          <input
            type="text"
            placeholder={
              inputQuery ? inputQuery : "Type product or recipe name"
            }
            onChange={handleInput}
          />
          <Button small onClick={handleSearch}>
            Search
          </Button>
        </div>
        <div>
          <p>We found {recipes.length} recipes</p>
          {/* FILTERS BADGES */}
          {userFilters.length > 0 ? (
            <div>
              <Button noStyle onClick={handleRemoveAll}>
                <span className={cn(styles.badge, styles.pinkBadge)}>
                  Clear Filters
                </span>
              </Button>

              {userFilters.map((id) => (
                <div className={styles.badge} key={id}>
                  {filters[id].label === "totalTime"
                    ? toHoursAndMin(filters[id].value)
                    : cleanString(filters[id].value)}
                  <Button icon="cancel" iconStyle onClick={handleRemove(id)} />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <Recipes />
      </main>
    </div>
  );
}

export default connect(
  createStructuredSelector({
    recipes: recipesListSelector,
    filters: filtersSelector,
    loading: recipesLoadingSelector,
    loaded: recipesLoadedSelector,
    userFilters: userFiltersSelector,
  }),
  (dispatch) => ({
    findRecipes: (query) => dispatch(loadRecipesByQuery(query)),
    removeFilter: (category) => dispatch(removeFilter(category)),
    removeAllFilters: () => dispatch(removeAllFilters()),
    updateRecipes: () => dispatch(updateRecipes()),
  })
)(HomePage);
