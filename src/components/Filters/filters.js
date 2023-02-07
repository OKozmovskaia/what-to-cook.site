import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { addFilter, updateRecipes } from "../../redux/actions";

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
  updateRecipes,
}) => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    addFilter(category);
    updateRecipes();
  }, [category, addFilter, updateRecipes]);

  const handleClickFilter = (e) => {
    setCategory([{ key: e.target.name, value: [e.target.value] }]);
  };

  const filterCategory = [
    {
      name: "Cooking time",
      label: "totalTime",
      filterContent: cookingTimeList,
    },
    {
      name: "Cuisine",
      label: "cuisineType",
      filterContent: cuisineTypeList,
    },
    {
      name: "Daytime",
      label: "mealType",
      filterContent: mealTypeList,
    },
    {
      name: "Dish",
      label: "dishType",
      filterContent: dishTypeList,
    },
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
    updateRecipes: () => dispatch(updateRecipes()),
  })
)(Filters);
