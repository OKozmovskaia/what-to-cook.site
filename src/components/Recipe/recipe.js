import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { recipesSelector } from "../../redux/selectors";
import Button from "../Button";
import styles from "./recipe.module.css";

const Recipe = ({ id, recipes }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  const {
    label,
    image,
    ingredientLines,
    totalTime,
    cuisineType,
    mealType,
    dishType,
  } = recipes[id];

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
        <div className={styles.mainWrapContainer}>
          <div className={styles.mainContainer}>
            <Button icon="cancel" iconStyle onClick={handleOpen} />
            <div className={styles.flexBox}>
              <img src={image} alt="recipe-img" />
              <div className={styles.content}>
                <h2>{label}</h2>
                <p>
                  <span className={styles.badge}>{cuisineType}</span>
                  <span className={styles.badge}>{dishType}</span>
                  <span className={styles.badge}>{mealType}</span>
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
                <div className={styles.flexBox}>
                  <Button small>Read Recipe</Button>
                  <Button small>Save Recipe</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default connect(
  createStructuredSelector({
    recipes: recipesSelector,
  })
)(Recipe);
