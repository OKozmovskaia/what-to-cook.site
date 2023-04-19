import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { addFilter, removeFilter } from "../../redux/actions/edamam_recipes";
import { filtersSelector, userFiltersSelector } from "../../redux/selectors";
import { cleanString } from "../../redux/utils/cleanString";
import { toHoursAndMin } from "../../redux/utils/toHoursAndMin";

import styles from "./listItemFilter.module.css";

const ListItemFilter = ({
  id,
  filters,
  userFilters,
  addFilter,
  removeFilter,
}) => {
  const defaultCheck = userFilters.includes(id) ? true : false;
  const [isChecked, setIsChecked] = useState(defaultCheck);
  const { label, value } = filters[id];

  const handleClickFilter = (e) => {
    const id = e.target.dataset.id;
    setIsChecked(!isChecked);

    if (e.target.checked) {
      addFilter(id);
    } else {
      removeFilter(id);
    }
  };

  return (
    <li className={styles.container}>
      <input
        type="checkBox"
        checked={isChecked}
        name={label}
        data-id={id}
        value={value}
        onChange={handleClickFilter}
      />
      {label === "totalTime" ? toHoursAndMin(value) : cleanString(value)}
    </li>
  );
};

export default connect(
  createStructuredSelector({
    filters: filtersSelector,
    userFilters: userFiltersSelector,
  }),
  { addFilter, removeFilter }
)(ListItemFilter);
