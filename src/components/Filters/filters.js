import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

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
}) => {
  const filterCategory = [
    cookingTimeList,
    cuisineTypeList,
    mealTypeList,
    dishTypeList,
  ];

  return (
    <div style={{ flexGrow: 1 }}>
      <h2>Filter</h2>
      <div>
        {filterCategory.map((i, index) => {
          return <FilterItem key={index} category={i} />;
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
  })
)(Filters);
