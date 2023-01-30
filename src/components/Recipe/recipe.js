import React from "react";
import Button from "../Button";
import Image from "../../images/empty-fridge.jpg";
import styles from "./recipe.module.css";

function Recipe() {
  return (
    <div className={styles.container}>
      <img src={Image} alt="recipe-img" />
      <div className={styles.content}>
        <h2>Tasty Recipe</h2>
        <p>30 min</p>
        <ul>
          <li>Ingredient 1</li>
          <li>Ingredient 2</li>
          <li>Ingredient 3</li>
        </ul>
        <div className={styles.buttonContainer}>
          <Button small>Read Recipe</Button>
          <Button small>Save Recipe</Button>
        </div>
        <p className={styles.pageNumber}>1</p>
      </div>
    </div>
  );
}

export default Recipe;
