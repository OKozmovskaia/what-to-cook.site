import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { recipesSelector } from "../../redux/selectors";
import { cleanString } from "../../redux/utils/cleanString";
import { toHoursAndMin } from "../../redux/utils/toHoursAndMin";

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

  const dish = cleanString(JSON.stringify(dishType));
  const meal = cleanString(JSON.stringify(mealType));
  const cuisine = cleanString(JSON.stringify(cuisineType));
  const time = toHoursAndMin(totalTime);

  return (
    <div>
      {/* RECIPE PREVIEW */}
      <div className={styles.previewWrapContainer}>
        <Button noStyle onClick={handleOpen}>
          <div className={styles.previewContainer}>
            <img src={image} alt="recipe-img" height="300" width="300" />
            <h4>{label}</h4>
            <p>
              {cuisine} {dish}
            </p>
            <p>
              Cook time:
              {totalTime > 0 ? (
                <span> {time}</span>
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
                  <span className={styles.badge}>{cuisine}</span>
                  <span className={styles.badge}>{dish}</span>
                  <span className={styles.badge}>{meal}</span>
                </p>
                <p>
                  Cook time:
                  {totalTime > 0 ? (
                    <span> {toHoursAndMin(totalTime)}</span>
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
