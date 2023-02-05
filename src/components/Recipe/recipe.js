import React, { useState } from "react";
import Button from "../Button";
import styles from "./recipe.module.css";

function Recipe({ recipe, recipeNumber }) {
  const [open, setOpen] = useState(false);

  const {
    label,
    image,
    ingredientLines,
    totalTime,
    cuisineType,
    mealType,
    dishType,
  } = recipe;

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      {/* RECIPE PREVIEW */}
      <div className={styles.previewWrapContainer}>
        <Button noStyle onClick={handleOpen}>
          <div className={styles.previewContainer}>
            <img src={image} alt="recipe-img" height="300" width="300" />
            <h4>{label}</h4>
            <p>
              {cuisineType} {dishType}
            </p>
            <p>
              Cook time:
              {totalTime > 0 ? (
                <span> {totalTime} min</span>
              ) : (
                <span> not mentioned</span>
              )}
            </p>
          </div>
        </Button>
      </div>

      {/* RECIPE BODY */}
      {open ? (
        <div className={styles.mainContainer}>
          <img src={image} alt="recipe-img" />
          <div className={styles.content}>
            <h2>{label}</h2>
            <p>
              {cuisineType} {dishType} {mealType}
            </p>
            <p>
              Cook time:
              {totalTime > 0 ? (
                <span> {totalTime} min</span>
              ) : (
                <span> not mentioned</span>
              )}
            </p>
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
      ) : null}
    </div>
  );
}

export default Recipe;
