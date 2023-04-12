import React, { useState } from "react";

import styles from "./listItem.module.css";

const ListItem = ({ item, checkBox, id, children }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <li className={styles.container}>
      {checkBox && (
        <input
          type="checkBox"
          checked={isChecked}
          name={item}
          data-id={id}
          value={item}
          onChange={handleCheck}
        />
      )}
      {item}
      {children}
    </li>
  );
};

export default ListItem;
