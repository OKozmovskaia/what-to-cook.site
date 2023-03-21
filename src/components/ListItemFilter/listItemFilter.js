import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { addFilter, updateRecipes, removeFilter } from "../../redux/actions";
import { filtersSelector, userFiltersSelector } from "../../redux/selectors";
import { cleanString } from "../../redux/utils/cleanString";
import { toHoursAndMin } from "../../redux/utils/toHoursAndMin";

import styles from "./listItemFilter.module.css";

const ListItemFilter = ({
  checkBox,
  children,
  id,
  filters,
  userFilters,
  addFilter,
  removeFilter,
  updateRecipes,
}) => {
  const defaultCheck = userFilters.includes(id) ? true : false;
  const [isChecked, setIsChecked] = useState(defaultCheck);
  const { label, value } = filters[id];

  const handleClickFilter = (e) => {
    const id = e.target.dataset.id;
    setIsChecked(!isChecked);

    if (e.target.checked) {
      addFilter(id);
      updateRecipes();
    } else {
      removeFilter(id);
      updateRecipes();
    }
  };

  return (
    <li className={styles.container}>
      {checkBox && (
        <input
          type="checkBox"
          checked={isChecked}
          name={label}
          data-id={id}
          value={value}
          onChange={handleClickFilter}
        />
      )}
      {label === "totalTime" ? toHoursAndMin(value) : cleanString(value)}
      {children}
    </li>
  );
};

export default connect(
  createStructuredSelector({
    filters: filtersSelector,
    userFilters: userFiltersSelector,
  }),
  (dispatch) => ({
    addFilter: (id) => dispatch(addFilter(id)),
    removeFilter: (id) => dispatch(removeFilter(id)),
    updateRecipes: () => dispatch(updateRecipes()),
  })
)(ListItemFilter);
