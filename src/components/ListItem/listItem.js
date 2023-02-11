import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { addFilter, updateRecipes, removeFilter } from "../../redux/actions";
import { filtersSelector } from "../../redux/selectors";

import styles from "./listItem.module.css";

const ListItem = ({
  checkBox,
  children,
  id,
  filters,
  addFilter,
  removeFilter,
  updateRecipes,
}) => {
  const [isChecked, setIsChecked] = useState(false);

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
      {value}
      {children}
    </li>
  );
};

export default connect(
  createStructuredSelector({
    filters: filtersSelector,
  }),
  (dispatch) => ({
    addFilter: (id) => dispatch(addFilter(id)),
    removeFilter: (id) => dispatch(removeFilter(id)),
    updateRecipes: () => dispatch(updateRecipes()),
  })
)(ListItem);
