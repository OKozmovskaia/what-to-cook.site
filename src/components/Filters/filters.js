import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { addFilter, updateRecipes, removeFilter } from "../../redux/actions";

import {
  dishTypeListSelector,
  mealTypeListSelector,
  cuisineTypeListSelector,
  cookingTimeListSelector,
} from "../../redux/selectors";

import FilterItem from "./FilterItem";

const Filters = ({
  dishTypeList,
  mealTypeList,
  cuisineTypeList,
  cookingTimeList,
  addFilter,
  removeFilter,
  updateRecipes,
}) => {
  const [category, setCategory] = useState([]);
  const [isRemove, setIsRemove] = useState(false);

  useEffect(() => {
    if (isRemove) {
      removeFilter(category);
    } else {
      addFilter(category);
    }
    updateRecipes();
  }, [category, isRemove, addFilter, removeFilter, updateRecipes]);

  const handleClickFilter = (e) => {
    if (!e.target.checked) {
      setIsRemove(true);
    } else {
      setIsRemove(false);
    }
    setCategory([{ key: e.target.name, value: [e.target.value] }]);
  };

  const filterCategory = [
    cookingTimeList,
    cuisineTypeList,
    mealTypeList,
    dishTypeList,
  ];

  return (
    <div>
      <h2>Filter</h2>
      <div>
        {filterCategory.map((i, index) => {
          return (
            <FilterItem key={index} category={i} onChange={handleClickFilter} />
          );
        })}
      </div>
    </div>
  );
};

export default connect(
  createStructuredSelector({
    dishTypeList: dishTypeListSelector,
    mealTypeList: mealTypeListSelector,
    cuisineTypeList: cuisineTypeListSelector,
    cookingTimeList: cookingTimeListSelector,
  }),
  (dispatch) => ({
    addFilter: (category) => dispatch(addFilter(category)),
    removeFilter: (category) => dispatch(removeFilter(category)),
    updateRecipes: () => dispatch(updateRecipes()),
  })
)(Filters);
