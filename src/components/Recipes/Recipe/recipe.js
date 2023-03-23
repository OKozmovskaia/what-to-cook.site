import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { saveRecipe, deleteRecipe } from "../../../redux/actions/user_recipes";
import { cleanString } from "../../../redux/utils/cleanString";
import { toHoursAndMin } from "../../../redux/utils/toHoursAndMin";

import Button from "../../Button";
import styles from "./recipe.module.css";

const Recipe = ({ id, recipes, saveRecipe, deleteRecipe }) => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const {
    label,
    image,
    url,
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

  const handleSave = () => {
    saveRecipe({ recipe: recipes[id] });
    handleOpen();
  };

  const handleDelete = () => {
    deleteRecipe(id);
    handleOpen();
  };

  return (
    <div>
      {/* RECIPE PREVIEW */}
      <div id={id} className={styles.previewWrapContainer}>
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
                  {ingredientLines.map((i, index) =>
                    pathname === "/" ? (
                      <li key={index}>{i}</li>
                    ) : (
                      <li key={index} className={styles.ingredientContainer}>
                        <div>
                          <Button iconStyle icon="plus" />
                        </div>
                        {i}
                      </li>
                    )
                  )}
                </ul>
                <div className={styles.flexBox}>
                  <Link to={url} target="_blank">
                    <Button small>Read Recipe</Button>
                  </Link>
                  {pathname === "/" ? (
                    <Button onClick={handleSave} small>
                      Save Recipe
                    </Button>
                  ) : (
                    <Button onClick={handleDelete} small>
                      Delete Recipe
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default connect(null, (dispatch) => ({
  saveRecipe: (recipe) => dispatch(saveRecipe(recipe)),
  deleteRecipe: (id) => dispatch(deleteRecipe(id)),
}))(Recipe);
