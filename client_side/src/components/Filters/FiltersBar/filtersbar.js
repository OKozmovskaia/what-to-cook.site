import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { cleanString } from "../../../redux/utils/cleanString";
import { toHoursAndMin } from "../../../redux/utils/toHoursAndMin";
import {
  removeFilter,
  removeAllFilters,
} from "../../../redux/actions/edamam_recipes";
import { userFiltersSelector, filtersSelector } from "../../../redux/selectors";

import Button from "../../Button";

import styles from "./filtersbar.module.css";
import cn from "classnames";

const FiltersBar = ({
  filters,
  userFilters,
  removeFilter,
  removeAllFilters,
}) => {
  const handleRemove = (id) => (e) => {
    e.preventDefault();
    removeFilter(id);
  };

  const handleRemoveAll = (e) => {
    e.preventDefault();
    removeAllFilters();
  };

  return (
    <div style={{ marginTop: "1em" }}>
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
  );
};

export default connect(
  createStructuredSelector({
    filters: filtersSelector,
    userFilters: userFiltersSelector,
  }),
  { removeAllFilters, removeFilter }
)(FiltersBar);
