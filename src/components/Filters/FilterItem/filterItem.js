import React from "react";
import { useState, useRef } from "react";
import useHandleClickOutside from "../../../hooks/use-handleCkickOutside";

import ListItem from "../../ListItem";
import Button from "../../Button";

import styles from "./filterItem.module.css";

const FilterItem = ({ category }) => {
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
            const id = i[0];

            return <ListItem checkBox key={id} id={id} />;
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default FilterItem;
