import React from "react";
import ListItem from "../ListItem/listItem";
// import styles from "./sidebar.module.css";

export default function Sidebar() {
  const foodCategory = ["Baking", "Beverages", "Cereals", "Candy"];

  return (
    <div>
      <h2>Choose Ingredients</h2>
      <ul>
        {foodCategory.map((i, index) => (
          <ListItem title={i} key={index} checkBox />
        ))}
      </ul>
    </div>
  );
}
