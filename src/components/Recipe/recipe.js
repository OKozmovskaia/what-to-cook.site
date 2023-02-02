import React from "react";
import Button from "../Button";
import styles from "./recipe.module.css";

function Recipe({ recipe, recipeNumber }) {
  const { label, image, ingredientLines, totalTime } = recipe;

  return (
    <div className={styles.container}>
      <img src={image} alt="recipe-img" />
      <div className={styles.content}>
        <h2>{label}</h2>
        <p>{totalTime} min</p>
        <ul>
          {ingredientLines.map((i, index) => (
            <li key={index}>{i}</li>
          ))}
        </ul>
        <div className={styles.buttonContainer}>
          <Button small>Read Recipe</Button>
          <Button small>Save Recipe</Button>
        </div>
        <p className={styles.pageNumber}>{recipeNumber}</p>
      </div>
    </div>
  );
}

export default Recipe;
