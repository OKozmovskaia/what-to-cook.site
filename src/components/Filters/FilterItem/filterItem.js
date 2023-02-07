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

  const filterContent = category.filterContent;
  return (
    <div className={styles.container} ref={dropDownMenu}>
      <Button icon="arrowDown" dropDown onClick={handleOpen}>
        {category.name}
      </Button>
      {open ? (
        <ul className={styles.filterContent}>
          {filterContent.map((m, index) => {
            return (
              <ListItem
                checkBox
                onChange={onChange}
                title={m}
                name={category.label}
                key={index}
              />
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default FilterItem;
