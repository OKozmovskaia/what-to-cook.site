import React from "react";
import { useState, useRef } from "react";
import useHandleClickOutside from "../../../hooks/use-handleCkickOutside";

import ListItem from "../../ListItem";
import Button from "../../Button";

import styles from "./filterItem.module.css";

const FilterItem = ({ category, onChange }) => {
  const [open, setOpen] = useState(false);
  const dropDownMenu = useRef();

  useHandleClickOutside(dropDownMenu, () => {
    setOpen(false);
  });

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.container} ref={dropDownMenu}>
      <Button icon="arrowDown" dropDown onClick={handleOpen}>
        {Object.values(category)[0].name}
      </Button>
      {open ? (
        <ul className={styles.filterContent}>
          {Object.entries(category).map((i) => {
            const value = i[1].value
              .replace(/[[\]"']+/g, "")
              .replace(/,+/g, ", ")
              .replace(/\/+/g, ", ");

            return (
              <ListItem
                checkBox
                onChange={onChange}
                title={value}
                value={value}
                name={i[1].label}
                key={i[0]}
                data-id={i[0]}
              />
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default FilterItem;
