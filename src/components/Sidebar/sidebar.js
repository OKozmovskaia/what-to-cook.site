import React from "react";
import FilterItem from "../FilterItem/filterItem";
// import styles from "./sidebar.module.css";

export default function Sidebar({ title }) {
  const filterCategory = [
    {
      name: "Cooking time",
      filterContent: ["10 min.", "20 min.", "30 min"],
    },
    {
      name: "Cuisine",
      filterContent: ["American", "Asian", "British"],
    },
    {
      name: "Health",
      filterContent: ["alcohool-free", "egg-free", "vegan"],
    },
    {
      name: "Daytime",
      filterContent: ["Breakfest", "Dinner", "Lunch"],
    },
    {
      name: "Dish",
      filterContent: ["Bread", "Drinks", "Pancake"],
    },
  ];

  return (
    <div>
      <h2>{title}</h2>
      <div>
        {filterCategory.map((i, index) => {
          return <FilterItem key={index} category={i} />;
        })}
      </div>
    </div>
  );
}
